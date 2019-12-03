
// const baseUrl = 'http://192.168.43.180:8000';
const baseUrl = 'http://127.0.0.1:8000';

const urls = {
    baseUrl: baseUrl,
    mapDir: baseUrl + '/ccb/map/',
    genChart: baseUrl + '/ccb/gen/chart/',
    mysqlGetDb: baseUrl + '/ccb/source/mysql/getdb/',
    mysqlSave: baseUrl + '/ccb/source/mysql/save/',
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
    getTemplate: baseUrl + '/ccb/get/template/',
};

export default urls
