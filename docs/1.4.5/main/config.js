function createConfig() {
    return {
        home: "about/01_overview",
        release: "1.4.5",
        releases: [
            "1.4.5"
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
            path: '/about/01_overview',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                description: 'Helidon documentation',
                keywords: 'helidon, java, microservices, microprofile, documentation',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-01_overview', '/about/01_overview', {})
        },
        {
            path: '/about/02_introduction',
            meta: {
                h1: 'Introduction',
                title: 'Introduction',
                description: 'about Helidon',
                keywords: 'helidon, java, microservices, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-02_introduction', '/about/02_introduction', {})
        },
        {
            path: '/about/02_mp-about',
            meta: {
                h1: 'About Helidon MP',
                title: 'About Helidon MP',
                description: 'about Helidon MP',
                keywords: 'helidon, java, microservices, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-02_mp-about', '/about/02_mp-about', {})
        },
        {
            path: '/about/02_se-about',
            meta: {
                h1: 'About Helidon SE',
                title: 'About Helidon SE',
                description: 'about Helidon MP',
                keywords: 'helidon, java, microservices, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-02_se-about', '/about/02_se-about', {})
        },
        {
            path: '/about/03_prerequisites',
            meta: {
                h1: 'Prerequisites',
                title: 'Prerequisites',
                description: 'Helidon pre-requisites',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-03_prerequisites', '/about/03_prerequisites', {})
        },
        {
            path: '/about/04_managing-dependencies',
            meta: {
                h1: 'Managing Dependencies',
                title: 'Managing Dependencies',
                description: 'Managing Maven dependencies',
                keywords: 'bom, dependency management',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-04_managing-dependencies', '/about/04_managing-dependencies', {})
        },
        {
            path: '/about/05_kubernetes',
            meta: {
                h1: 'Kubernetes on your Desktop',
                title: 'Kubernetes on your Desktop',
                description: 'Running Kubernetes on your desktop.',
                keywords: 'kubernetes',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-05_kubernetes', '/about/05_kubernetes', {})
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
            path: '/webserver/09_jsonb-support',
            meta: {
                h1: 'JSON-B Support',
                title: 'JSON-B Support',
                description: 'Helidon Reactive WebServer JSON-B support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-09_jsonb-support', '/webserver/09_jsonb-support', {})
        },
        {
            path: '/webserver/10_jackson-support',
            meta: {
                h1: 'Jackson Support',
                title: 'Jackson Support',
                description: 'Helidon Reactive WebServer Jackson support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-10_jackson-support', '/webserver/10_jackson-support', {})
        },
        {
            path: '/webserver/11_access-log',
            meta: {
                h1: 'WebServer Access Log',
                title: 'WebServer Access Log',
                description: 'Helidon Reactive Webserver Access Log',
                keywords: 'helidon, webserver, access log',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('webserver-11_access-log', '/webserver/11_access-log', {})
        },
        {
            path: '/grpc/01_introduction',
            meta: {
                h1: 'gRPC Server Introduction',
                title: 'gRPC Server Introduction',
                description: 'Helidon gRPC Server Introduction',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-01_introduction', '/grpc/01_introduction', {})
        },
        {
            path: '/grpc/02_configuration',
            meta: {
                h1: 'gRPC Server Configuration',
                title: 'gRPC Server Configuration',
                description: 'Helidon gRPC Server Configuration',
                keywords: 'helidon, grpc, java, configuration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-02_configuration', '/grpc/02_configuration', {})
        },
        {
            path: '/grpc/03_routing',
            meta: {
                h1: 'gRPC Server Routing',
                title: 'gRPC Server Routing',
                description: 'Helidon gRPC Server Routing',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-03_routing', '/grpc/03_routing', {})
        },
        {
            path: '/grpc/04_service_implementation',
            meta: {
                h1: 'gRPC Service Implementation',
                title: 'gRPC Service Implementation',
                description: 'Helidon gRPC Service Implementation',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-04_service_implementation', '/grpc/04_service_implementation', {})
        },
        {
            path: '/grpc/05_interceptors',
            meta: {
                h1: 'gRPC Interceptors',
                title: 'gRPC Interceptors',
                description: 'Helidon gRPC Service Interceptors',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-05_interceptors', '/grpc/05_interceptors', {})
        },
        {
            path: '/grpc/06_health_checks',
            meta: {
                h1: 'gRPC Service Health Checks',
                title: 'gRPC Service Health Checks',
                description: 'Helidon gRPC Service Health Checks',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-06_health_checks', '/grpc/06_health_checks', {})
        },
        {
            path: '/grpc/07_metrics',
            meta: {
                h1: 'gRPC Service Metrics',
                title: 'gRPC Service Metrics',
                description: 'Helidon gRPC Service Metrics',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-07_metrics', '/grpc/07_metrics', {})
        },
        {
            path: '/grpc/08_security',
            meta: {
                h1: 'gRPC Server Security',
                title: 'gRPC Server Security',
                description: 'Helidon Security gRPC integration',
                keywords: 'helidon, grpc, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-08_security', '/grpc/08_security', {})
        },
        {
            path: '/grpc/21_client_introduction',
            meta: {
                h1: 'gRPC Client Introduction',
                title: 'gRPC Client Introduction',
                description: 'Helidon gRPC Client Introduction',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-21_client_introduction', '/grpc/21_client_introduction', {})
        },
        {
            path: '/grpc/22_client_configuration',
            meta: {
                h1: 'gRPC Client Configuration',
                title: 'gRPC Client Configuration',
                description: 'Helidon gRPC Client Configuration',
                keywords: 'helidon, grpc, java, configuration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-22_client_configuration', '/grpc/22_client_configuration', {})
        },
        {
            path: '/grpc/23_client_implementation',
            meta: {
                h1: 'gRPC Client Implementation',
                title: 'gRPC Client Implementation',
                description: 'Helidon gRPC Client Implementation',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-23_client_implementation', '/grpc/23_client_implementation', {})
        },
        {
            path: '/grpc/32_mp_server_side_services',
            meta: {
                h1: 'gRPC MicroProfile Server Services',
                title: 'gRPC MicroProfile Server Services',
                description: 'Helidon gRPC MicroProfile Server-Side Services',
                keywords: 'helidon, grpc, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-32_mp_server_side_services', '/grpc/32_mp_server_side_services', {})
        },
        {
            path: '/grpc/33_mp_clients',
            meta: {
                h1: 'gRPC MicroProfile Clients',
                title: 'gRPC MicroProfile Clients',
                description: 'Building Helidon gRPC MicroProfile Clients',
                keywords: 'helidon, grpc, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('grpc-33_mp_clients', '/grpc/33_mp_clients', {})
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
            path: '/security/05_extensibility',
            meta: {
                h1: 'Extending Security',
                title: 'Extending Security',
                description: null,
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('security-05_extensibility', '/security/05_extensibility', {})
        },
        {
            path: '/microprofile/01_introduction',
            meta: {
                h1: 'MicroProfile Introduction',
                title: 'MicroProfile Introduction',
                description: 'Helidon MicroProfile introduction',
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
                description: 'Helidon MicroProfile static content',
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
            path: '/microprofile/07_tracing',
            meta: {
                h1: 'Tracing',
                title: 'Tracing',
                description: 'Helidon MP Tracing Support',
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-07_tracing', '/microprofile/07_tracing', {})
        },
        {
            path: '/microprofile/08_openapi',
            meta: {
                h1: 'OpenAPI',
                title: 'OpenAPI',
                description: 'Helidon MP OpenAPI Support',
                keywords: 'helidon, mp, microprofile, openapi',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-08_openapi', '/microprofile/08_openapi', {})
        },
        {
            path: '/microprofile/09_rest-client',
            meta: {
                h1: 'Rest Client',
                title: 'Rest Client',
                description: 'Helidon MP Rest Client',
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-09_rest-client', '/microprofile/09_rest-client', {})
        },
        {
            path: '/microprofile/10_reactive-routing',
            meta: {
                h1: 'Reactive routing in Helidon MP',
                title: 'Reactive routing in Helidon MP',
                description: 'Helidon MP reactive routing',
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('microprofile-10_reactive-routing', '/microprofile/10_reactive-routing', {})
        },
        {
            path: '/extensions/01_overview',
            meta: {
                h1: 'Extensions Overview',
                title: 'Extensions Overview',
                description: 'Helidon extensions',
                keywords: 'helidon, java, microservices, microprofile, extensions',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('extensions-01_overview', '/extensions/01_overview', {})
        },
        {
            path: '/extensions/02_cdi_datasource-hikaricp',
            meta: {
                h1: 'CDI extension for HikariCP',
                title: 'CDI extension for HikariCP',
                description: 'Helidon CDI extension for HikariCP',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, hikaricp',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('extensions-02_cdi_datasource-hikaricp', '/extensions/02_cdi_datasource-hikaricp', {})
        },
        {
            path: '/extensions/02_cdi_datasource-ucp',
            meta: {
                h1: 'CDI extension for Oracle UCP',
                title: 'CDI extension for Oracle UCP',
                description: 'Helidon CDI extension for Oracle Universal Connection Pool',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, ucp',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('extensions-02_cdi_datasource-ucp', '/extensions/02_cdi_datasource-ucp', {})
        },
        {
            path: '/extensions/03_cdi_jedis',
            meta: {
                h1: 'CDI extension for Jedis',
                title: 'CDI extension for Jedis',
                description: 'Helidon CDI extension for Jedis',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, jedis, redis',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('extensions-03_cdi_jedis', '/extensions/03_cdi_jedis', {})
        },
        {
            path: '/extensions/04_cdi_oci-objectstorage',
            meta: {
                h1: 'CDI extension for OCI Object storage',
                title: 'CDI extension for OCI Object storage',
                description: 'Helidon CDI extension for HikariCP',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, oci, object storage',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('extensions-04_cdi_oci-objectstorage', '/extensions/04_cdi_oci-objectstorage', {})
        },
        {
            path: '/extensions/05_cdi_jta',
            meta: {
                h1: 'CDI extension for JTA',
                title: 'CDI extension for JTA',
                description: 'Helidon CDI extension for JTA',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, jta',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('extensions-05_cdi_jta', '/extensions/05_cdi_jta', {})
        },
        {
            path: '/metrics/01_metrics',
            meta: {
                h1: 'Metrics',
                title: 'Metrics',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('metrics-01_metrics', '/metrics/01_metrics', {})
        },
        {
            path: '/metrics/02_prometheus',
            meta: {
                h1: 'Prometheus Metrics',
                title: 'Prometheus Metrics',
                description: 'Helidon Prometheus metrics',
                keywords: 'helidon, metrics, prometheus',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('metrics-02_prometheus', '/metrics/02_prometheus', {})
        },
        {
            path: '/tracing/01_tracing',
            meta: {
                h1: 'Tracing',
                title: 'Tracing',
                description: 'Helidon Tracing Support',
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('tracing-01_tracing', '/tracing/01_tracing', {})
        },
        {
            path: '/tracing/02_zipkin',
            meta: {
                h1: 'Zipkin Tracing',
                title: 'Zipkin Tracing',
                description: 'Helidon Tracing Support',
                keywords: 'helidon, tracing, zipkin',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('tracing-02_zipkin', '/tracing/02_zipkin', {})
        },
        {
            path: '/tracing/03_jaeger',
            meta: {
                h1: 'Jaeger Tracing',
                title: 'Jaeger Tracing',
                description: 'Helidon Tracing Support',
                keywords: 'helidon, tracing, jaeger',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('tracing-03_jaeger', '/tracing/03_jaeger', {})
        },
        {
            path: '/health/01_health',
            meta: {
                h1: 'Health Checks',
                title: 'Health Checks',
                description: 'Helidon health checks',
                keywords: 'helidon, health-checks, health, check',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('health-01_health', '/health/01_health', {})
        },
        {
            path: '/health/02_health_in_k8s',
            meta: {
                h1: 'Kubernetes Probes',
                title: 'Kubernetes Probes',
                description: 'Kubernetes probes',
                keywords: 'helidon, readiness, liveness, probes, kubernetes',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('health-02_health_in_k8s', '/health/02_health_in_k8s', {})
        },
        {
            path: '/openapi/01_openapi',
            meta: {
                h1: 'OpenAPI in SE',
                title: 'OpenAPI in SE',
                description: 'Helidon SE OpenAPI Support',
                keywords: 'helidon, se, openapi',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('openapi-01_openapi', '/openapi/01_openapi', {})
        },
        {
            path: '/guides/01_overview',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                description: 'Helidon guides',
                keywords: 'helidon, java, microservices, microprofile, guides',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-01_overview', '/guides/01_overview', {})
        },
        {
            path: '/guides/02_quickstart-se',
            meta: {
                h1: 'Quickstart SE',
                title: 'Quickstart SE',
                description: 'Helidon SE Quickstart guide',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-02_quickstart-se', '/guides/02_quickstart-se', {})
        },
        {
            path: '/guides/03_quickstart-mp',
            meta: {
                h1: 'Quickstart MP',
                title: 'Quickstart MP',
                description: 'Helidon MP Quickstart guide',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-03_quickstart-mp', '/guides/03_quickstart-mp', {})
        },
        {
            path: '/guides/07_health_mp_guide',
            meta: {
                h1: 'Health Check MP Guide',
                title: 'Health Check MP Guide',
                description: 'Helidon health-checks',
                keywords: 'helidon, health-checks, health, check',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-07_health_mp_guide', '/guides/07_health_mp_guide', {})
        },
        {
            path: '/guides/07_health_se_guide',
            meta: {
                h1: 'Health Check SE Guide',
                title: 'Health Check SE Guide',
                description: 'Helidon health-checks',
                keywords: 'helidon, health-check, health, check',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-07_health_se_guide', '/guides/07_health_se_guide', {})
        },
        {
            path: '/guides/09_metrics_mp_guide',
            meta: {
                h1: 'Metrics MP Guide',
                title: 'Metrics MP Guide',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-09_metrics_mp_guide', '/guides/09_metrics_mp_guide', {})
        },
        {
            path: '/guides/09_metrics_se_guide',
            meta: {
                h1: 'Metrics SE Guide',
                title: 'Metrics SE Guide',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-09_metrics_se_guide', '/guides/09_metrics_se_guide', {})
        },
        {
            path: '/guides/11_config_mp_guide',
            meta: {
                h1: 'Config MP Guide',
                title: 'Config MP Guide',
                description: 'Helidon configuration',
                keywords: 'helidon, configuration, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-11_config_mp_guide', '/guides/11_config_mp_guide', {})
        },
        {
            path: '/guides/11_config_se_guide',
            meta: {
                h1: 'Config SE Guide',
                title: 'Config SE Guide',
                description: 'Helidon configuration',
                keywords: 'helidon, configuration, microprofile, guide, SE',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-11_config_se_guide', '/guides/11_config_se_guide', {})
        },
        {
            path: '/guides/12_tracing_mp_guide',
            meta: {
                h1: 'Tracing MP Guide',
                title: 'Tracing MP Guide',
                description: 'Helidon tracing',
                keywords: 'helidon, tracing, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-12_tracing_mp_guide', '/guides/12_tracing_mp_guide', {})
        },
        {
            path: '/guides/12_tracing_se_guide',
            meta: {
                h1: 'Tracing SE Guide',
                title: 'Tracing SE Guide',
                description: 'Helidon tracing',
                keywords: 'helidon, tracing, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-12_tracing_se_guide', '/guides/12_tracing_se_guide', {})
        },
        {
            path: '/guides/20_datasource',
            meta: {
                h1: 'Setting Up Data Sources',
                title: 'Setting Up Data Sources',
                description: 'Helidon MP Data Source Guide',
                keywords: 'helidon, guide, datasource, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-20_datasource', '/guides/20_datasource', {})
        },
        {
            path: '/guides/22_jta',
            meta: {
                h1: 'Setting Up Transaction Support',
                title: 'Setting Up Transaction Support',
                description: 'Helidon JTA Guide',
                keywords: 'helidon, guide, transaction, jta, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-22_jta', '/guides/22_jta', {})
        },
        {
            path: '/guides/24_jpa',
            meta: {
                h1: 'Using JPA in Helidon MP',
                title: 'Using JPA in Helidon MP',
                description: 'Helidon JPA Guide',
                keywords: 'helidon, guide, transaction, jpa, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-24_jpa', '/guides/24_jpa', {})
        },
        {
            path: '/guides/30_dockerfile',
            meta: {
                h1: 'Creating Docker Images',
                title: 'Creating Docker Images',
                description: 'Helidon Docker Guide',
                keywords: 'helidon, guide, docker',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-30_dockerfile', '/guides/30_dockerfile', {})
        },
        {
            path: '/guides/32_jib',
            meta: {
                h1: 'Build Container Images with Jib',
                title: 'Build Container Images with Jib',
                description: 'Helidon Jib Guide',
                keywords: 'helidon, guide, docker, jib',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-32_jib', '/guides/32_jib', {})
        },
        {
            path: '/guides/34_Oracle_Kubernetes',
            meta: {
                h1: 'Deploying to OKE',
                title: 'Deploying to OKE',
                description: 'Helidon Oracle Container Engine for Kubernetes (OKE) Guide',
                keywords: 'helidon, guide, oracle, kubernetes',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-34_Oracle_Kubernetes', '/guides/34_Oracle_Kubernetes', {})
        },
        {
            path: '/guides/36_graalnative',
            meta: {
                h1: 'GraalVM Native Images',
                title: 'GraalVM Native Images',
                description: 'Helidon SE Native Images',
                keywords: 'helidon, guide, graalvm',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-36_graalnative', '/guides/36_graalnative', {})
        },
        {
            path: '/guides/91_mp-tutorial',
            meta: {
                h1: 'Helidon MP Tutorial',
                title: 'Helidon MP Tutorial',
                description: 'Helidon MP Tutorial',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('guides-91_mp-tutorial', '/guides/91_mp-tutorial', {})
        },
        {
            path: '/community/01_community',
            meta: {
                h1: 'Community',
                title: 'Community',
                description: 'Helidon community',
                keywords: 'helidon, community, slack, github, twitter, blog',
                customLayout: null,
                hasNav: false
            },
            component: loadPage('community-01_community', '/community/01_community', {})
        },
        {
            path: '/', redirect: '/about/01_overview'
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
            action: 'assistant',
            group: '/about',
            items: [
                { href: '/about/01_overview', title: 'Overview' },
                { href: '/about/02_introduction', title: 'Introduction' },
                { href: '/about/02_mp-about', title: 'About Helidon MP' },
                { href: '/about/02_se-about', title: 'About Helidon SE' },
                { href: '/about/03_prerequisites', title: 'Prerequisites' },
                { href: '/about/04_managing-dependencies', title: 'Managing Dependencies' },
                { href: '/about/05_kubernetes', title: 'Kubernetes on your Desktop' }
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
                { href: '/webserver/09_jsonb-support', title: 'JSON-B Support' },
                { href: '/webserver/10_jackson-support', title: 'Jackson Support' },
                { href: '/webserver/11_access-log', title: 'WebServer Access Log' }
            ]
        },
        {
            title: 'gRPC server',
            action: 'swap_horiz',
            group: '/grpc',
            items: [
                { href: '/grpc/01_introduction', title: 'gRPC Server Introduction' },
                { href: '/grpc/02_configuration', title: 'gRPC Server Configuration' },
                { href: '/grpc/03_routing', title: 'gRPC Server Routing' },
                { href: '/grpc/04_service_implementation', title: 'gRPC Service Implementation' },
                { href: '/grpc/05_interceptors', title: 'gRPC Interceptors' },
                { href: '/grpc/06_health_checks', title: 'gRPC Service Health Checks' },
                { href: '/grpc/07_metrics', title: 'gRPC Service Metrics' },
                { href: '/grpc/08_security', title: 'gRPC Server Security' },
                { href: '/grpc/21_client_introduction', title: 'gRPC Client Introduction' },
                { href: '/grpc/22_client_configuration', title: 'gRPC Client Configuration' },
                { href: '/grpc/23_client_implementation', title: 'gRPC Client Implementation' },
                { href: '/grpc/32_mp_server_side_services', title: 'gRPC MicroProfile Server Services' },
                { href: '/grpc/33_mp_clients', title: 'gRPC MicroProfile Clients' }
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
                { href: '/security/04_tools', title: 'Security Tools' },
                { href: '/security/05_extensibility', title: 'Extending Security' }
            ]
        },
        {
            title: 'MicroProfile',
            action: 'widgets',
            group: '/microprofile',
            items: [
                { href: '/microprofile/01_introduction', title: 'MicroProfile Introduction' },
                { href: '/microprofile/02_server-configuration', title: 'Configuring the Server' },
                { href: '/microprofile/03_application-configuration', title: 'Configuring the Application' },
                { href: '/microprofile/04_static-content', title: 'Serving Static Content' },
                { href: '/microprofile/05_security', title: 'Adding Security' },
                { href: '/microprofile/06_configuration', title: 'Configuration Secrets' },
                { href: '/microprofile/07_tracing', title: 'Tracing' },
                { href: '/microprofile/08_openapi', title: 'OpenAPI' },
                { href: '/microprofile/09_rest-client', title: 'Rest Client' },
                { href: '/microprofile/10_reactive-routing', title: 'Reactive routing in Helidon MP' }
            ]
        },
        {
            title: 'Extensions',
            action: 'extension',
            group: '/extensions',
            items: [
                { href: '/extensions/01_overview', title: 'Extensions Overview' },
                { href: '/extensions/02_cdi_datasource-hikaricp', title: 'CDI extension for HikariCP' },
                { href: '/extensions/02_cdi_datasource-ucp', title: 'CDI extension for Oracle UCP' },
                { href: '/extensions/03_cdi_jedis', title: 'CDI extension for Jedis' },
                { href: '/extensions/04_cdi_oci-objectstorage', title: 'CDI extension for OCI Object storage' },
                { href: '/extensions/05_cdi_jta', title: 'CDI extension for JTA' }
            ]
        },
        {
            title: 'Metrics',
            action: 'av_timer',
            group: '/metrics',
            items: [
                { href: '/metrics/01_metrics', title: 'Metrics' },
                { href: '/metrics/02_prometheus', title: 'Prometheus Metrics' }
            ]
        },
        {
            title: 'Tracing',
            action: 'timeline',
            group: '/tracing',
            items: [
                { href: '/tracing/01_tracing', title: 'Tracing' },
                { href: '/tracing/02_zipkin', title: 'Zipkin Tracing' },
                { href: '/tracing/03_jaeger', title: 'Jaeger Tracing' }
            ]
        },
        {
            title: 'Health Checks',
            action: 'favorite_outline',
            group: '/health',
            items: [
                { href: '/health/01_health', title: 'Health Checks' },
                { href: '/health/02_health_in_k8s', title: 'Kubernetes Probes' }
            ]
        },
        {
            title: 'OpenAPI',
            action: 'donut_large',
            group: '/openapi',
            items: [
                { href: '/openapi/01_openapi', title: 'OpenAPI in SE' }
            ]
        },
        {
            title: 'Guides',
            action: 'explore',
            group: '/guides',
            items: [
                { href: '/guides/01_overview', title: 'Overview' },
                { href: '/guides/02_quickstart-se', title: 'Quickstart SE' },
                { href: '/guides/03_quickstart-mp', title: 'Quickstart MP' },
                { href: '/guides/07_health_mp_guide', title: 'Health Check MP Guide' },
                { href: '/guides/07_health_se_guide', title: 'Health Check SE Guide' },
                { href: '/guides/09_metrics_mp_guide', title: 'Metrics MP Guide' },
                { href: '/guides/09_metrics_se_guide', title: 'Metrics SE Guide' },
                { href: '/guides/11_config_mp_guide', title: 'Config MP Guide' },
                { href: '/guides/11_config_se_guide', title: 'Config SE Guide' },
                { href: '/guides/12_tracing_mp_guide', title: 'Tracing MP Guide' },
                { href: '/guides/12_tracing_se_guide', title: 'Tracing SE Guide' },
                { href: '/guides/20_datasource', title: 'Setting Up Data Sources' },
                { href: '/guides/22_jta', title: 'Setting Up Transaction Support' },
                { href: '/guides/24_jpa', title: 'Using JPA in Helidon MP' },
                { href: '/guides/30_dockerfile', title: 'Creating Docker Images' },
                { href: '/guides/32_jib', title: 'Build Container Images with Jib' },
                { href: '/guides/34_Oracle_Kubernetes', title: 'Deploying to OKE' },
                { href: '/guides/36_graalnative', title: 'GraalVM Native Images' },
                { href: '/guides/91_mp-tutorial', title: 'Helidon MP Tutorial' }
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
            action: 'fa-github',
            href: '#/community/01_community',
            target: '_blank'
        }
    ];
}