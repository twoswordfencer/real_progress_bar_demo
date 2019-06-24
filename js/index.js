window.addEventListener('load', function() {
  // センサーの閾値(0～1023)
  var threshold = 1000;

  var isLight = new Array();

  var progressbar = document.getElementById('progressbar');

  // Initialize Firebase
  var config = {
    apiKey: //"your api Key",
    authDomain: //"your auth domain",
    databaseURL: //"your detabaseURL",
    projectId: //"your projectId",
    storageBucket: //"your storageBucket",
    messagingSenderId: //"your messagingSensorId"
  };
  firebase.initializeApp(config);

  var sensorCheck = firebase.database().ref('/lights');
  sensorCheck.on('value', function(sensor) {
  if(sensor.val()){
    console.log(sensor.val())
    console.log(Object.keys(sensor.val()).length)
    updateLight(sensor.val(), Object.keys(sensor.val()).length)
  }
  });

  function updateLight(values, sensors) {
    lightId = 1;
    while (lightId<sensors+1) {
      if (values["light" + lightId] >= threshold) lightOn(lightId);
      else lightOff(lightId,sensors);
      lightId++;
    }
  }

  // 明るくなったとき
  function lightOn(lightId) {
    if (isLight[lightId]) return
    else isLight[lightId] = true;

    console.log(lightId + "が明るくなった")
  }

  // 暗くなったとき
  function lightOff(lightId,sensors) {
    if (!isLight[lightId]) return
    else isLight[lightId] = false;

    console.log(lightId + "が暗くなった");

    progressbar.value = progressbar.max*(lightId)/sensors;   
  }
});

function Button_Click(){
  firebase.database().ref('lights/').remove();
  window.location.reload();
}