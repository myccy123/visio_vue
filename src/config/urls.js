let baseUrl = getBaseUrl();

const urls = {
    baseUrl: baseUrl,
    mapDir: baseUrl + '/ccb/map/',
    genChart: baseUrl + '/ccb/gen/chart/',
    mysqlGetDb: baseUrl + '/ccb/source/mysql/getdb/',
    mysqlSave: baseUrl + '/ccb/source/mysql/save/',
    mysqlEdit: baseUrl + '/ccb/source/mysql/edit/',
    mysqlClone: baseUrl + '/ccb/source/mysql/clone/',
    mysqlCheck: baseUrl + '/ccb/source/mysql/check/',
    mysqlPreview: baseUrl + '/ccb/source/mysql/preview/',
    sourceList: baseUrl + '/ccb/source/list/',
    delSource: baseUrl + '/ccb/source/mysql/delete/',
    sourceDetail: baseUrl + '/ccb/source/detail/',
    chartList: baseUrl + '/ccb/chart/list/',
    getChart: baseUrl + '/ccb/get/chart/',
    delChart: baseUrl + '/ccb/chart/delete/',
    publish: baseUrl + '/ccb/publish/',
    templateList: baseUrl + '/ccb/template/list/',
    delTemplate: baseUrl + '/ccb/delete/template/',
    cloneTemplate: baseUrl + '/ccb/clone/template/',
    getTemplate: baseUrl + '/ccb/get/template/',
    customCates: baseUrl + '/ccb/cate/list/',
    customCateQuery: baseUrl + '/ccb/cate/query/',
};

export default urls
