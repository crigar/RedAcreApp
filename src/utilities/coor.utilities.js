
module.exports = {
    getPath(data) {
        let path = [];
        for (const coor of data.features[0].geometry.coordinates) {
            path.push({ lat: coor[1], lng: coor[0] });
        }
        return path;
    }
}