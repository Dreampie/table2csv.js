/**
  * auther Stony
**/
jQuery.fn.table2csv = function(options) {
    var options = jQuery.extend({
        separator: ',',
        header: [],
        delivery: 'popup' // popup, value
    },
    options);
	
	
	var el = this;
	row = []

	function TransferString(content){  
		var string = content;  
		try{  
			string = string.replace(/\r\n/g,"")  
			string = string.replace(/\n/g,"");  
			string = string.replace(/,/g, "");
		}catch(e) {  
			alert(e.message);  
		}  
		return string;
	}
	$(el).find('tr').each(function() {
		t = [];
		//$(el).filter(':visible').find('th')
		if($(this).find('th').length){
			$(this).find('th').each(function() {
				t.push(TransferString($(this).text()));
			});
		}else{
			$(this).find('td').each(function() {
				t.push(TransferString($(this).text()));
			});
		}
		row.push(t.join(options.separator));
	});
	function popup(data) {
		var generator = window.open('', 'csv', 'height=600,width=1000');
		generator.document.write('<html><head><title>CSV</title>');
		generator.document.write('</head><body >');
		generator.document.write('<textArea style="width:100%;height:100%%" cols=70 rows=15 wrap="off" >');
		generator.document.write(data);
		generator.document.write('</textArea>');
		generator.document.write('</body></html>');
		generator.document.close();
		return true;
	}
	if (options.delivery == 'popup') {
        return popup(row.join("\n"));
    } else {
        return row.join('\n');
    }
};

