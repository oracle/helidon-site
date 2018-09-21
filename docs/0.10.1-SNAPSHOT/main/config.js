function createConfig() {
    return {
        home: "about/01_introduction",
        release: "0.10.1-SNAPSHOT",
        releases: [
            "0.10.1-SNAPSHOT"
        ],
        pathColors: {
            "*": "blue-grey"
        },
        theme: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
        },
        navTitle: 'Helidon',
        navIcon: null,
        navLogo: 'images/helidon_logo_dark.svg'
    };
}

function createRoutes(){
    return [
        {
            path: '/about/01_introduction',
            meta: {
                h1: '介绍',
                title: '介绍',
                description: 'about Helidon',
                keywords: 'helidon, java, microservices, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-01_introduction', '/about/01_introduction', {})
        },
        {
            path: '/getting-started/01_prerequisites',
            meta: {
                h1: '前置条件',
                title: '前置条件',
                description: 'Helidon pre-requisites',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('getting-started-01_prerequisites', '/getting-started/01_prerequisites', {})
        },
        {
            path: '/getting-started/02_base-example',
            meta: {
                h1: '快速入门示例',
                title: '快速入门示例',
                description: 'Helidon 快速入门',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('getting-started-02_base-example', '/getting-started/02_base-example', {})
        },
        {
            path: '/getting-started/03_managing-dependencies',
            meta: {
                h1: 'Managing Dependencies',
                title: 'Managing Dependencies',
                description: 'Managing Maven dependencies',
                keywords: 'bom, dependency management',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('getting-started-03_managing-dependencies', '/getting-started/03_managing-dependencies', {})
        },
        {
            path: '/getting-started/04_kubernetes',
            meta: {
                h1: 'Kubernetes on your Desktop',
                title: 'Kubernetes on your Desktop',
                description: 'Running Kubernetes on your desktop.',
                keywords: 'kubernetes',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('getting-started-04_kubernetes', '/getting-started/04_kubernetes', {})
        },
        {
            path: '/webserver/01_introduction',
            meta: {
                h1: 'WebServer Introduction',
                title: 'WebServer Introduction',
                description: 'Helidon Reactive WebServer Introduction',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-01_introduction', '/webserver/01_introduction', {})
        },
        {
            path: '/webserver/02_configuration',
            meta: {
                h1: 'WebServer Configuration',
                title: 'WebServer Configuration',
                description: 'Helidon Reactive Webserver Configuration',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-02_configuration', '/webserver/02_configuration', {})
        },
        {
            path: '/webserver/03_routing',
            meta: {
                h1: 'Routing',
                title: 'Routing',
                description: 'Helidon Reactive WebServer Routing',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-03_routing', '/webserver/03_routing', {})
        },
        {
            path: '/webserver/04_request-handling',
            meta: {
                h1: 'Request Handling',
                title: 'Request Handling',
                description: 'Helidon Reactive WebServer request handling',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-04_request-handling', '/webserver/04_request-handling', {})
        },
        {
            path: '/webserver/05_error-handling',
            meta: {
                h1: 'Error Handling',
                title: 'Error Handling',
                description: 'Helidon Reactive WebServer error handling',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-05_error-handling', '/webserver/05_error-handling', {})
        },
        {
            path: '/webserver/06_static-content-support',
            meta: {
                h1: 'Static Content Support',
                title: 'Static Content Support',
                description: 'Helidon Reactive WebServer static content support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-06_static-content-support', '/webserver/06_static-content-support', {})
        },
        {
            path: '/webserver/07_jersey-support',
            meta: {
                h1: 'Jersey (JAX-RS) Support',
                title: 'Jersey (JAX-RS) Support',
                description: 'Helidon Reactive WebServer Jersey JAX-RS support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-07_jersey-support', '/webserver/07_jersey-support', {})
        },
        {
            path: '/webserver/08_json-support',
            meta: {
                h1: 'JSON Support',
                title: 'JSON Support',
                description: 'Helidon Reactive WebServer JSON support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-08_json-support', '/webserver/08_json-support', {})
        },
        {
            path: '/webserver/09_tracing-support',
            meta: {
                h1: 'Tracing Support',
                title: 'Tracing Support',
                description: 'Helidon Reactive WebServer Tracing Support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-09_tracing-support', '/webserver/09_tracing-support', {})
        },
        {
            path: '/webserver/10_metrics-support',
            meta: {
                h1: 'Metrics and Health Support',
                title: 'Metrics and Health Support',
                description: 'Helidon Reactive WebServer metrics and health support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver, metrics',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-10_metrics-support', '/webserver/10_metrics-support', {})
        },
        {
            path: '/config/01_introduction',
            meta: {
                h1: 'The Configuration Component',
                title: 'The Configuration Component',
                description: 'Helidon config introduction',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-01_introduction', '/config/01_introduction', {})
        },
        {
            path: '/config/02_config-sources',
            meta: {
                h1: 'Loading Configuration: Config Sources and Parsers',
                title: 'Loading Configuration: Config Sources and Parsers',
                description: 'A summary of Helidon config sources and parsers',
                keywords: 'Helidon, config, sources, parsers',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-02_config-sources', '/config/02_config-sources', {})
        },
        {
            path: '/config/03_hierarchical-features',
            meta: {
                h1: 'Hierarchical Features',
                title: 'Hierarchical Features',
                description: 'Helidon hierarchical features',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-03_hierarchical-features', '/config/03_hierarchical-features', {})
        },
        {
            path: '/config/04_property-mapping',
            meta: {
                h1: 'Property Mapping',
                title: 'Property Mapping',
                description: 'Helidon config property mapping',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-04_property-mapping', '/config/04_property-mapping', {})
        },
        {
            path: '/config/05_mutability-support',
            meta: {
                h1: 'Mutability Support',
                title: 'Mutability Support',
                description: 'Helidon mutability support',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-05_mutability-support', '/config/05_mutability-support', {})
        },
        {
            path: '/config/06_advanced-configuration',
            meta: {
                h1: 'Advanced Configuration Topics',
                title: 'Advanced Configuration Topics',
                description: 'Helidon config advanced configuration',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-06_advanced-configuration', '/config/06_advanced-configuration', {})
        },
        {
            path: '/config/07_extensions',
            meta: {
                h1: 'Extensions',
                title: 'Extensions',
                description: 'Helidon config extensions',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-07_extensions', '/config/07_extensions', {})
        },
        {
            path: '/config/08_supported-formats',
            meta: {
                h1: 'Additional Supported Formats and Sources',
                title: 'Additional Supported Formats and Sources',
                description: 'Helidon config supported formats and sources',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('config-08_supported-formats', '/config/08_supported-formats', {})
        },
        {
            path: '/security/01_introduction',
            meta: {
                h1: 'Security Introduction',
                title: 'Security Introduction',
                description: 'Helidon Security introduction',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('security-01_introduction', '/security/01_introduction', {})
        },
        {
            path: '/security/02_providers',
            meta: {
                h1: 'Security Providers',
                title: 'Security Providers',
                description: 'Helidon Security providers',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('security-02_providers', '/security/02_providers', {})
        },
        {
            path: '/security/03_containers-integration',
            meta: {
                h1: 'Containers Integration',
                title: 'Containers Integration',
                description: 'Helidon Security containers integration',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('security-03_containers-integration', '/security/03_containers-integration', {})
        },
        {
            path: '/security/04_tools',
            meta: {
                h1: 'Security Tools',
                title: 'Security Tools',
                description: 'Helidon Security Tools',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('security-04_tools', '/security/04_tools', {})
        },
        {
            path: '/microprofile/01_introduction',
            meta: {
                h1: 'Microprofile Introduction',
                title: 'Microprofile Introduction',
                description: 'Helidon Microprofile introduction',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-01_introduction', '/microprofile/01_introduction', {})
        },
        {
            path: '/microprofile/02_server-configuration',
            meta: {
                h1: 'Configuring the Server',
                title: 'Configuring the Server',
                description: 'Helidon MicroProfile server configuration',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-02_server-configuration', '/microprofile/02_server-configuration', {})
        },
        {
            path: '/microprofile/03_application-configuration',
            meta: {
                h1: 'Configuring the Application',
                title: 'Configuring the Application',
                description: 'Helidon MicroProfile application configuration',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-03_application-configuration', '/microprofile/03_application-configuration', {})
        },
        {
            path: '/microprofile/04_static-content',
            meta: {
                h1: 'Serving Static Content',
                title: 'Serving Static Content',
                description: 'Helidon Microprofile static content',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-04_static-content', '/microprofile/04_static-content', {})
        },
        {
            path: '/microprofile/05_security',
            meta: {
                h1: 'Adding Security',
                title: 'Adding Security',
                description: 'Helidon MicroProfile security',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-05_security', '/microprofile/05_security', {})
        },
        {
            path: '/microprofile/06_configuration',
            meta: {
                h1: 'Configuration Secrets',
                title: 'Configuration Secrets',
                description: 'Helidon MicroProfile configuration secrets',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-06_configuration', '/microprofile/06_configuration', {})
        },
        {
            path: '/', redirect: '/about/01_introduction'
        },
        {
            path: '*', redirect: '/'
        }
    ];
}

function createNav(){
    return [
        { header: 'Core documentation' },
        {
            title: 'About',
            action: 'weekend',
            group: '/about',
            items: [
                { href: '/about/01_introduction', title: '介绍' }
            ]
        },
        {
            title: 'Getting Started',
            action: 'assistant',
            group: '/getting-started',
            items: [
                { href: '/getting-started/01_prerequisites', title: '前置条件' },
                { href: '/getting-started/02_base-example', title: '快速入门示例' },
                { href: '/getting-started/03_managing-dependencies', title: 'Managing Dependencies' },
                { href: '/getting-started/04_kubernetes', title: 'Kubernetes on your Desktop' }
            ]
        },
        {
            title: 'Reactive webserver',
            action: 'settings_ethernet',
            group: '/webserver',
            items: [
                { href: '/webserver/01_introduction', title: 'WebServer Introduction' },
                { href: '/webserver/02_configuration', title: 'WebServer Configuration' },
                { href: '/webserver/03_routing', title: 'Routing' },
                { href: '/webserver/04_request-handling', title: 'Request Handling' },
                { href: '/webserver/05_error-handling', title: 'Error Handling' },
                { href: '/webserver/06_static-content-support', title: 'Static Content Support' },
                { href: '/webserver/07_jersey-support', title: 'Jersey (JAX-RS) Support' },
                { href: '/webserver/08_json-support', title: 'JSON Support' },
                { href: '/webserver/09_tracing-support', title: 'Tracing Support' },
                { href: '/webserver/10_metrics-support', title: 'Metrics and Health Support' }
            ]
        },
        {
            title: 'Config',
            action: 'settings',
            group: '/config',
            items: [
                { href: '/config/01_introduction', title: 'The Configuration Component' },
                { href: '/config/02_config-sources', title: 'Loading Configuration: Config Sources and Parsers' },
                { href: '/config/03_hierarchical-features', title: 'Hierarchical Features' },
                { href: '/config/04_property-mapping', title: 'Property Mapping' },
                { href: '/config/05_mutability-support', title: 'Mutability Support' },
                { href: '/config/06_advanced-configuration', title: 'Advanced Configuration Topics' },
                { href: '/config/07_extensions', title: 'Extensions' },
                { href: '/config/08_supported-formats', title: 'Additional Supported Formats and Sources' }
            ]
        },
        {
            title: 'Security',
            action: 'security',
            group: '/security',
            items: [
                { href: '/security/01_introduction', title: 'Security Introduction' },
                { href: '/security/02_providers', title: 'Security Providers' },
                { href: '/security/03_containers-integration', title: 'Containers Integration' },
                { href: '/security/04_tools', title: 'Security Tools' }
            ]
        },
        {
            title: 'Microprofile',
            action: 'widgets',
            group: '/microprofile',
            items: [
                { href: '/microprofile/01_introduction', title: 'Microprofile Introduction' },
                { href: '/microprofile/02_server-configuration', title: 'Configuring the Server' },
                { href: '/microprofile/03_application-configuration', title: 'Configuring the Application' },
                { href: '/microprofile/04_static-content', title: 'Serving Static Content' },
                { href: '/microprofile/05_security', title: 'Adding Security' },
                { href: '/microprofile/06_configuration', title: 'Configuration Secrets' }
            ]
        },
        {
            title: 'Javadocs',
            action: 'library_books',
            href: 'apidocs/index.html?overview-summary.html',
            target: '_blank'
        },
        { divider: true },
        { header: 'Additional resources' },
        {
            title: 'Community',
            action: 'fa-slack',
            href: 'https://join.slack.com/t/helidon/shared_invite/enQtNDM1NjU3MjkyNDg2LTFkZTM4NmI3OWUyNjUxYWQ5Njc0NGNiMzY3MTZiZmMwNzAxYmI4YzUzOWNkNzNlZTEwNDRkZGU4YzMzZjhkNTE',
            target: '_blank'
        }
    ];
}