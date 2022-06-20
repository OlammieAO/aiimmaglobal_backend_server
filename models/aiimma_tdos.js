const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM aiimma_tdos t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findById = async (ID) => {
    const query = `SELECT  t.* FROM aiimma_tdos t  WHERE t.ID=? LIMIT 0,1`;
    return getRows(query,[ID]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO aiimma_tdos set ?`;
    const id = await insertRow(query, object);
    return id > 0 ;
}

exports.update = async (ID, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE aiimma_tdos SET ? WHERE ID= ?`;
    updateValues = updateValues.concat([ID])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findById(ID) : null;
}

exports.remove = async (ID) => {
    const query = `DELETE FROM aiimma_tdos Where ID= ? `;
    return deleteRow(query,[ID]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM aiimma_tdos t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM aiimma_tdos t  WHERE  LOWER(t.TDOGeneralCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.TDOIndividualCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.ShippingLine) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.ContainerNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.Tonage) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.TonageDetails) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.Destination) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.DestinationDetails) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.ServiceStatus) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.LoggedIP) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.UploadedBy) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.User_Uploaded_ID) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.RecordCreatedAt) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM aiimma_tdos t  WHERE  LOWER(t.TDOGeneralCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.TDOIndividualCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.ShippingLine) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.ContainerNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.Tonage) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.TonageDetails) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.Destination) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.DestinationDetails) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.ServiceStatus) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.LoggedIP) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.UploadedBy) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.User_Uploaded_ID) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.RecordCreatedAt) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


