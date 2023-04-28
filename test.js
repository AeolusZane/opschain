const data = { "name": "fanruan2", "containerNamePrefix": "", "nodes": [{ "nodeType": "APP", "appType": "fdl", "host": "192.168.101.52", "port": "22", "username": "root", "authType": "KEY", "principal": "WEXa8+h5tKdHKjJuTDHyHQ==", "dataRoot": "~/data", "password": "", "keyPath": "holder1682670150963_mLKM7EgY" }], "components": [{ "componentName": "fr", "kind": "basic", "portMapping": { "8080": 8080, "12100": 12100 }, "pathMapping": { "/usr/local/tomcat/webapps/webroot/logs": "logs", "/usr/local/tomcat/webapps/webroot/WEB-INF/assist": "assist", "/usr/local/tomcat/mount": "mount", "/usr/local/tomcat/webapps/webroot/WEB-INF/config": "config", "/usr/local/tomcat/logs": "tomcat_logs", "/usr/local/tomcat/webapps/webroot/WEB-INF/plugins": "plugins", "/usr/local/tomcat/webapps/webroot/WEB-INF/customlib": "customlib", "/usr/local/tomcat/webapps/webroot/WEB-INF/classes": "classes" } }, { "componentName": "bi6", "kind": "basic", "portMapping": { "8080": 8080, "12100": 12100 }, "pathMapping": { "/usr/local/tomcat/webapps/webroot/logs": "logs", "/usr/local/tomcat/webapps/webroot/bi-data": "bi-data", "/usr/local/tomcat/webapps/webroot/WEB-INF/assist": "assist", "/usr/local/tomcat/mount": "mount", "/usr/local/tomcat/webapps/webroot/WEB-INF/config": "config", "/usr/local/tomcat/logs": "tomcat_logs", "/usr/local/tomcat/webapps/webroot/WEB-INF/plugins": "plugins", "/usr/local/tomcat/webapps/webroot/WEB-INF/customlib": "customlib", "/usr/local/tomcat/webapps/webroot/WEB-INF/classes": "classes" } }, { "componentName": "fdl", "kind": "basic", "portMapping": { "8080": "8090", "12100": "12110", "15500": "15510" }, "pathMapping": { "/usr/local/tomcat/webapps/webroot/logs": "logs", "/usr/local/tomcat/webapps/webroot/WEB-INF/assist": "assist", "/usr/local/tomcat/mount": "mount", "/usr/local/tomcat/webapps/webroot/WEB-INF/config": "config", "/usr/local/tomcat/logs": "tomcat_logs", "/usr/local/tomcat/webapps/webroot/WEB-INF/plugins": "plugins", "/usr/local/tomcat/webapps/webroot/WEB-INF/customlib": "customlib", "/usr/local/tomcat/webapps/webroot/WEB-INF/classes": "classes" } }, { "username": "root", "password": "oKY8WtuZoHWxOXUeQDwyDQ==", "componentName": "mysql", "kind": "mysql", "portMapping": { "3306": "3316" }, "pathMapping": { "/var/lib/mysql": "data", "/etc/mysql/conf.d": "conf", "/var/log/mysql": "log" } }, { "componentName": "mysqld_exporter", "kind": "mysql", "portMapping": { "9104": "9114" } }, { "componentName": "zookeeper", "kind": "kafka", "portMapping": {}, "pathMapping": { "/bitnami/zookeeper/data": "data" } }, { "componentName": "kafka", "kind": "kafka", "portMapping": { "9092": "9093" }, "pathMapping": { "/bitnami/kafka/data": "data", "/opt/bitnami/kafka/config/server.properties": "config/server.properties" } }, { "componentName": "kafka_exporter", "kind": "kafka", "portMapping": { "9308": "9318" } }, { "componentName": "node_exporter", "kind": "basic", "portMapping": { "9100": "9110" } }, { "componentName": "ops_agent", "kind": "basic", "portMapping": { "9070": "9071" }, "pathMapping": { "/usr/local/agent/resources": "resources", "/usr/local/agent/conf": "conf", "/usr/local/agent/logs": "logs", "/var/run/docker.sock": "/var/run/docker.sock" } }, { "componentName": "promtail", "kind": "basic", "portMapping": { "9080": "9081" }, "pathMapping": { "/mnt/config": "config" } }], "cluster": false, "appType": "fdl", "fileService": null, "dbConfig": null, "statusService": null, "contextPath": "webroot" };

const Config = {
    fr: {
        name: 'fr',
        text: 'FineReport',
        components: [],
    },
    bi: {
        name: 'bi6',
        text: 'FineBI',
        components: [],
    },
    fdl: {
        name: 'fdl',
        text: 'FineDataLink',
        components: ['kafka'],
    },
};
function appComponentsAdapter(appType) {
    const appFilter = (appType) => (item) => {
        const { name, components: defaultComponents } = Config[appType];

        return item.componentName === name || defaultComponents.includes(item.componentName);
    };

    return function(component) {
        /**
         * app组件(包括kafka这类与app强相关的组件)
         */
        const app = appFilter(appType);

        /**
         * 非app组件
         */
        const nonApp = (item) =>
            !BI.some(Config, (type) => appFilter(type)(item));

        return  app(component) || nonApp(component);
    };
};
console.log(data.components.filter(appComponentsAdapter('fdl')));