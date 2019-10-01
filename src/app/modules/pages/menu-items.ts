export const APP_ITEMS = [
    {
        label: 'Mi Horario',
        link: '/pages/mySchedule',
        icon: 'perm_contact_calendar',
        accessLevel: 3
    },
    {
        label: 'Clientes',
        icon: 'person',
        accessLevel: 2,
        items: [
            {
                label: 'Clientes',
                link: '/pages/clients/clients',
                icon: 'folder_shared',
            },
            {
                label: 'Tatuajes',
                link: '/pages/clients/tattoos',
                icon: 'storage',
            },
        ]
    },
    {
        label: 'Configuración',
        icon: 'build',
        accessLevel: 1,
        items: [
            {
                label: 'Usuarios',
                link: '/pages/configuration/users',
                icon: 'account_circle',
            },
            {
                label: 'Tintas',
                link: '/pages/configuration/ink',
                icon: 'opacity',
            },
            {
                label: 'Insumos',
                link: '/pages/configuration/supply',
                icon: 'work',
            },
        ]
    },
    {
        label: 'Horario',
        icon: 'date_range',
        accessLevel: 2,
        items: [
            {
                label: 'Vista general',
                link: '/pages/schedule/overview',
                icon: 'calendar_today',
            },
            {
                label: 'Agendar Sesiones',
                link: '/pages/schedule/scheduleSession',
                icon: 'schedule',
            },
        ]
    },
    {
        label: 'Inventario',
        link: '/pages/inventory',
        accessLevel: 2,
        icon: 'playlist_add_check',
    },
    {
        label: 'Reportes',
        icon: 'assignment',
        accessLevel: 1,
        items: [
            {
                label: 'Sesiones',
                link: '/pages/reports/sessionsReport',
                icon: 'list_alt',
            },
        ]
    },
    {
        label: 'Administración',
        icon: 'lock',
        accessLevel: 0,
        items: [
            {
                label: 'Actividades Usuarios',
                link: '/pages/administration/userActivity',
                icon: 'account_circle',
            },
        ]
    },
];
