class DataLoader {
  constructor() {

  }

  loadDataContainer(cbFunc) {
    // Have to make the -main.json to be flexible later
    // For multiview implementation later
    const jData = './assets/allData.json';
    const mData = './assets/allData-main.json';

    getMapFromJsonFile(jData, (allData) => {
      getMapFromJsonFile(mData, (allDataMeta) => {
        let nD = convertKeyToInt(allData);
        let nM = convertKeyToInt(allDataMeta)
        let container = new DataContainer(nD, nM);
        cbFunc(container);
      });

      
    });

    function getMapFromJsonFile(metaName, cbFunc) {
    
      loadJSON(metaName, function(responseText) {
        let map = getMap(responseText);
        cbFunc(map);
  
        function getMap(str) {
          let map = undefined;
          try {
            let obj = JSON.parse(str);
            map = new Map(Object.entries(obj));
          } catch (e) {
            console.log(e);
          }
          return map;
        }
      });
  
      function loadJSON(metaName, callback) {
  
        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        // xobj.open('GET', './assets/allData.json', true); // Replace 'my_data' with the path to your file
        xobj.open('GET', metaName, true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
        };
        xobj.send(null);  
      }
    }

    function convertKeyToInt(map) {
      let m = new Map();
      map.forEach((value, index) => {
        m.set(parseInt(index), value);
      });
      return m;
    }
  }

  
}