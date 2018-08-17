var Test = (function() {

  var doc = document;

  var tableClassInstance = null;

  /* Table class Main start */
  function Table(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.tableArray = [];
  }

  Table.prototype.generateTableArray = function() {
    for (var rowCounter = 0; rowCounter < this.numRows; rowCounter++) {
      this.tableArray[rowCounter] = [];
      for (var colCounter = 0; colCounter < this.numCols; colCounter++) {
        var cellObj = new Cell(rowCounter, colCounter);
        cellObj.setCellInnerHTML();
        this.tableArray[rowCounter][colCounter] = cellObj;
      }
    }
  }

  Table.prototype.populateTableHTML = function() {
    var finalHTML = '';
    for (var rowCounter = 0; rowCounter < this.numRows; rowCounter++) {
      finalHTML += '<div class="row-item">';
      for (var colCounter = 0; colCounter < this.numCols; colCounter++) {
        finalHTML += this.tableArray[rowCounter][colCounter].cellInnerHTML;
      }
      finalHTML += '</div>';
    }
    doc.getElementById('table-content').innerHTML = finalHTML;
  }

  Table.prototype.generateTableHeader = function() {
    var headerHTML = '<div class="row-item">';
    for (var c = 0; c < this.numCols; c++) {
      headerHTML += '<div class="cell-item"> Col_Hdr_'+c;
      headerHTML += '<a href="javascript:void(0)"';
      headerHTML +=  ' onclick=Test.sortCol("asc",\''+c+'\') type="asc" class="asc-sort" id="sort_asc_'+c+'">asc</a>';
      headerHTML += '<a href="javascript:void(0)"';
      headerHTML +=  ' onclick=Test.sortCol("desc",\''+c+'\')  type="desc" class="desc-sort" id="sort_desc_'+c+'">desc</a>';
      headerHTML += '</div>';
    }
    headerHTML += '</div>';
    document.getElementById('sort-headers').innerHTML = headerHTML;
  }

  Table.prototype.generateTableHTML = function() {
    this.generateTableArray();
    this.generateTableHeader();
    this.populateTableHTML();
  }

  /* Table class Main end */

  /* Cell class Main start */

  function Cell(rowPos, colPos) {
    this.value = this.value || (rowPos.toString() + colPos.toString() + 'sample-text ');
    this.rowPos = rowPos;
    this.colPos = colPos;
    this.cellInnerHTML = '';
  }

  Cell.prototype.setCellInnerHTML = function() {
    var cellID = this.rowPos + '_' + this.colPos;
    var cellHTML = '<div class="cell-item">';
    cellHTML += '<span id="cell_text_'+cellID+'"';
    cellHTML += ' ondblclick="Test.showInputCell(\''+cellID+'\')">'+this.value+'</span>';
    cellHTML += '<input id="cell_input_'+cellID+'"';
    cellHTML += ' onKeyPress="Test.updateCellValue(\''+cellID+'\')"';
    cellHTML += 'type="text" value="'+this.value+'"/>';
    cellHTML += '</div>';
    this.cellInnerHTML = cellHTML;
  }

  /* Cell class Main end */

  function sortColAsc(colIndex) {
    tableClassInstance.tableArray.sort(function(rowArr1, rowArr2){
      var obj1 = rowArr1[colIndex];
      var obj2 = rowArr2[colIndex];
      console.log('obj1 value : '+obj1.value);
      console.log('obj2 value : '+obj2.value);
      return (obj1.value > obj2.value);
    });
    console.log(tableClassInstance.tableArray);
    tableClassInstance.populateTableHTML();
  }

  function sortColDesc(colIndex) {
    tableClassInstance.tableArray.sort(function(rowArr1, rowArr2){
      var obj1 = rowArr1[colIndex];
      var obj2 = rowArr2[colIndex];
      console.log('obj1 value : '+obj1.value);
      console.log('obj2 value : '+obj2.value);
      return (obj2.value > obj1.value);
    });
    console.log(tableClassInstance.tableArray);
    tableClassInstance.populateTableHTML();
  }

  /* events start */

  function sortCol(sortType, colIndex) {
    var ascLink = document.getElementById('sort_asc_'+colIndex);
    var descLink = document.getElementById('sort_desc_'+colIndex);
    if (sortType === 'asc') {
      document.getElementById('sort_desc_'+colIndex).style.display = 'block';
      document.getElementById('sort_asc_'+colIndex).style.display = 'none';
      sortColAsc(colIndex);
    }
    if (sortType === 'desc') {
      document.getElementById('sort_desc_'+colIndex).style.display = 'none';
      document.getElementById('sort_asc_'+colIndex).style.display = 'block';
      sortColDesc(colIndex);
    }
  }

  function showInputCell(cellRowColPos) {
    var displayCellObj = document.getElementById('cell_text_'+cellRowColPos);
    var inputCellObj = document.getElementById('cell_input_'+cellRowColPos);
    displayCellObj.style.display = 'none';
    inputCellObj.style.display = 'block';
  }

  function updateCellValue(cellRowColPos) {
    if (event.which === 13) {
      var displayCellObj = document.getElementById('cell_text_'+cellRowColPos);
      var inputCellObj = document.getElementById('cell_input_'+cellRowColPos);
      var posArray = cellRowColPos.split('_');
      var updatedValue = inputCellObj.value;
      document.getElementById('cell_input_'+cellRowColPos).value = updatedValue;
      document.getElementById('cell_text_'+cellRowColPos).innerHTML = updatedValue;
      displayCellObj.style.display = 'block';
      inputCellObj.style.display = 'none';
      var cellObj = tableClassInstance.tableArray[posArray[0]][posArray[1]];
      cellObj.value = updatedValue;
      cellObj.setCellInnerHTML();
      console.log(cellObj);
    }
  }
  // [
  // [obj1]
//]

  function generateTable(){
    var numOfRows = doc.getElementById('numRows').value * 1;
    var numOfCols = doc.getElementById('numCols').value * 1;
    tableClassInstance = new Table(numOfRows, numOfCols);
    tableClassInstance.generateTableHTML();
    console.log(tableClassInstance.tableArray);
  }

  return {
    sortCol: sortCol,
    generateTable: generateTable,
    updateCellValue: updateCellValue,
    showInputCell: showInputCell
  }
})();



/* events end */
