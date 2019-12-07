export const APP_ITEMS = [
    {
        label: 'Mi Horario',
        link: '/pages/schedule/mySchedule',
        icon: 'perm_contact_calendar',
        accessLevel: 3
    },
    {
        label: 'Clientes',
        link: '/pages/clients',
        icon: 'folder_shared',
    },
    {
        label: 'Tatuajes',
        link: '/pages/tattoos',
        icon: 'invert_colors',
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
                link: '/pages/configuration/inks',
                icon: 'opacity',
            },
            {
                label: 'Insumos',
                link: '/pages/configuration/supplies',
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
        label: 'Reportes',
        icon: 'assignment',
        accessLevel: 1,
        items: [
            {
                label: 'Sesiones',
                link: '/pages/reports/tattooSessions',
                icon: 'list_alt',
            },
            {
                label: 'Sesiones por Operario',
                link: '/pages/reports/userTattooSessions',
                icon: 'list_alt',
            },
        ]
    },
];
