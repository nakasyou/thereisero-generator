function waitLoad(element) {
  return new Promise((resolve) => {
    element.onload = resolve;
  });
}
(async()=>{
  // Canvas init
  const $canvas = document.getElementById("canvas");
  const ctx = $canvas.getContext('2d');

  // Get エロあるよ
  const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmII7Qm0SnXtfNhDI7Kb-RwbpVhreZG2K_0g&usqp=CAU";
  const eroaruyoBlobUrl = await fetch(url).then(res=>res.blob()).then(URL.createObjectURL);
  
  const $eroaruyoRaw = document.getElementById("eroaruyo-raw");
  const eroaruyoLoadPromise = waitLoad($eroaruyoRaw);
  $eroaruyoRaw.src = eroaruyoBlobUrl;
  await eroaruyoLoadPromise;
  
  const $result = document.getElementById('result');
  function draw(text){
    // Draw エロあるよ
    $canvas.width = $eroaruyoRaw.width;
    $canvas.height = $eroaruyoRaw.height;
    ctx.drawImage($eroaruyoRaw,0,0);
  
    // Remove エロあるよ
    const backgroundColor = "#F4D24F";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(100, 50, 550, 120);
  
    // Draw text
    const fontSize = 52;
    // Calc max width
    ctx.font = `bold ${fontSize}px serif`;
    const widthsForLines = text.split("\n").map(line=>ctx.measureText(line));
    ctx.fillStyle = "#000";
    for(const [index, line] of Object.entries(text.split("\n")).map(v=>[parseInt(v[0]),v[1]])) {
      const x = ($canvas.width - widthsForLines[index].width) / 2;
      ctx.fillText(line, x, 100 + index * fontSize * 1.2);
    }
    
    $result.src = $canvas.toDataURL();
  }
  const $textArea = document.getElementById("textarea");
  $textArea.oninput = event => {
    draw(event.target.value);
  };
  draw($textArea.value);
})().catch(error => {
  console.error(`${error.name}: ${error.message} (${error.line})`)
  console.log(error.stack)
});
