const { createFilter, SQLLang } = require("odata-v4-sql")


const func = async (event, ctx) => {
    const { data } = event;
    const uriSegments = data.split("/")
    const lastUriSegment = uriSegments[uriSegments.length - 1]
    const tableName = lastUriSegment.split("?")[0]
    const matches = data.match(/\$filter=(.+?)(?:(&|$))/)
    const filterSegment = matches ? matches[1] : null;
    // const filterOnly
    // const filterSegment = data.split("$filter=")[1]
    // const filterOnly = filterSegment.split("&$")[0]
    console.log({
        uriSegments,
        lastUriSegment,
        tableName,
        filterSegment,
    })

    console.log("incoming filter", filterSegment)
    const filter = createFilter(filterSegment, { useParameters: false, type: SQLLang.PostgreSql }, SQLLang.PostgreSql);
    const sql = filter.from(tableName);
    // console.log(filter)
    console.log(sql);

    return { result: sql };
}
// const data = "http://localhost:8080/odata/pets/v1/pets?$top=20&$count=true&$orderby=_Id%20asc&$filter=contains%28Name%2C%27Gin%27%29&$select=_Id%2CName%2CAnimalType"
// const data = "http://localhost:8080/odata/pets/v1/pets?$top=20&$count=true&$orderby=_Id%20asc&$filter=contains%28Name%2C%27Gin%27%29"
// const data = "http://localhost:8080/odata/pets/v1/pets?$top=20&$count=true&$orderby=_Id%20asc"
// func({data});
exports.handler = func
