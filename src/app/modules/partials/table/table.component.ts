import { Component, OnInit, Input, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { isNullOrUndefined } from 'util';

// Interface para definir botones en una columna de la tabla
export interface ColumnButtonDefinition {
  label?: string;
  icon?: string;
  action: (row: any) => any;
  show?: (row: any) => any;
  color?: 'primary' | 'warn' | 'accent';
}

// Interface para definir las columnas de la tabla
export interface TableColumnDefinition {
  columnDefinition: string;
  columnName: string;
  buttons?: ColumnButtonDefinition[];
  cell?: (row: any) => any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() displayedColumns: string[] = []; // Array con los nombres y el orden de las columnas a ser mostradas
  @Input() tableColumnDefinitions: TableColumnDefinition[]; // Array de definiciones de columnas
  @Input() dataSource = []; // Input de datos Raw

  @Output() rowClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort; // Componente sort de tablas de material
  @ViewChild(MatPaginator) paginator: MatPaginator; // Componente paginador de tablas de material

  tableDataSource: MatTableDataSource<any>; // Fuente de datos de la tabla

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (isNullOrUndefined(this.dataSource)) {
      return;
    }
    // Cada vez que se altera el datasource se genera un nuevo MatTableDataSource
    this.tableDataSource = new MatTableDataSource(this.dataSource);

    // Esto sobreescribe el filtro y hace que busque recursivamente en objetos anidados
    this.tableDataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    // Esto sobreescribe el sorting. De esta forma busca en el contenido final que muestra la celda
    this.tableDataSource.sortingDataAccessor = (item, property) => {
      const definition: TableColumnDefinition = this.tableColumnDefinitions.find(x => x.columnDefinition === property);
      return definition.cell ? definition.cell(item) : null;
    };

    // Necesario para linkear los sort headers a la tabla
    this.tableDataSource.sort = this.sort;

    // Linkea el paginator a la tabla
    this.tableDataSource.paginator = this.paginator;
  }

  // Revisa si es objeto anidado
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  // Aplica el filtro sobre los datos de la tabla
  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row) {
    this.rowClicked.emit(row);
  }

}
