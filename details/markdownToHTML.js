'use strict';
const marked=require('marked');
const fs=require('fs');
const path=require('path');
const readline=require('readline');

const html ='./html&css/';
const js ='./javascript/';
const template='../template/template.html';

//原始文件
let orginal=path.join(__dirname,html+'01_flex布局.md');
let res=path.join(path.dirname(orginal),path.basename(orginal, '.md')+'.html') ;

const input=fs.createReadStream(template);
const output=fs.createWriteStream(res);
let markd='';

fs.readFile(orginal,'utf-8',(err,data)=>{
	markd=data.toString();
	const r1=readline.createInterface(
		{
			input:input,
			output:output,
			crlfDelay: Infinity
		}
	);
	r1.on('line',(line)=>	{
		if (line==='<div class=container>') {
			output.write('\n'+line+marked(markd));
			return;
		}
		output.write('\n'+line);
	});
});



