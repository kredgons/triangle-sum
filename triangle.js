let input = document.querySelector('input');
let textarea = document.querySelector('textarea');

//First, wait for any change on the file
input.addEventListener('change', () => {
  let files = input.files;
  if (files.length === 0) return;

  const file = files[0];

  let reader = new FileReader();

  //everything's good, load the file:
  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/)

    let arrayOfTriangle = [];
    for (l in lines) {
      //turn string into strings , then into ints, then array...
      let subArrayTriangle = [];
      if ( lines[l].indexOf(' ') >= 0 ) { //if the input has white space
        let arrayOfStrings = lines[l].split(' ');
        //create the full subarray
        for (i in arrayOfStrings) {
          let num = parseInt(arrayOfStrings[i]);
          if (Number.isInteger(num))
            subArrayTriangle.push(num);
        }
      } else { //no need for a full subarray
        subArrayTriangle.push(parseInt(lines[l]));
      }
      arrayOfTriangle.push(subArrayTriangle);
    }
    sumOfTriangle = minimumTotal(arrayOfTriangle);
    textarea.value = sumOfTriangle;
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
})

//work on figuring out the min total of the triangle
let minimumTotal = function(triangle) {
    return triangle.reverse().reduce(calculate).pop();
};

//get the minimum of current line
//then add to total
let calculate = (prev, curr) => {
    const level = []
    for(let j = 0; j < curr.length; j++) {
        level[j] = Math.min(prev[j], prev[j + 1]) + curr[j];
    }
    return level;
}
