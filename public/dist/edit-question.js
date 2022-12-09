(()=>{function W(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}var q=W();function ne(r){q=r}var G=/[&<>"']/,ie=new RegExp(G.source,"g"),V=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,se=new RegExp(V.source,"g"),re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Q=r=>re[r];function w(r,e){if(e){if(G.test(r))return r.replace(ie,Q)}else if(V.test(r))return r.replace(se,Q);return r}var le=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function J(r){return r.replace(le,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}var ae=/(^|[^\[])\^/g;function m(r,e){r=typeof r=="string"?r:r.source,e=e||"";let n={replace:(t,i)=>(i=i.source||i,i=i.replace(ae,"$1"),r=r.replace(t,i),n),getRegex:()=>new RegExp(r,e)};return n}var oe=/[^\w:]/g,ce=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function P(r,e,n){if(r){let t;try{t=decodeURIComponent(J(n)).replace(oe,"").toLowerCase()}catch{return null}if(t.indexOf("javascript:")===0||t.indexOf("vbscript:")===0||t.indexOf("data:")===0)return null}e&&!ce.test(n)&&(n=fe(e,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}var Z={},he=/^[^:]+:\/*[^/]*$/,pe=/^([^:]+:)[\s\S]*$/,ue=/^([^:]+:\/*[^/]*)[\s\S]*$/;function fe(r,e){Z[" "+r]||(he.test(r)?Z[" "+r]=r+"/":Z[" "+r]=v(r,"/",!0)),r=Z[" "+r];let n=r.indexOf(":")===-1;return e.substring(0,2)==="//"?n?e:r.replace(pe,"$1")+e:e.charAt(0)==="/"?n?e:r.replace(ue,"$1")+e:r+e}var B={exec:function(){}};function z(r){let e=1,n,t;for(;e<arguments.length;e++){n=arguments[e];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r}function N(r,e){let n=r.replace(/\|/g,(s,l,a)=>{let c=!1,g=l;for(;--g>=0&&a[g]==="\\";)c=!c;return c?"|":" |"}),t=n.split(/ \|/),i=0;if(t[0].trim()||t.shift(),t.length>0&&!t[t.length-1].trim()&&t.pop(),t.length>e)t.splice(e);else for(;t.length<e;)t.push("");for(;i<t.length;i++)t[i]=t[i].trim().replace(/\\\|/g,"|");return t}function v(r,e,n){let t=r.length;if(t===0)return"";let i=0;for(;i<t;){let s=r.charAt(t-i-1);if(s===e&&!n)i++;else if(s!==e&&n)i++;else break}return r.slice(0,t-i)}function ge(r,e){if(r.indexOf(e[1])===-1)return-1;let n=r.length,t=0,i=0;for(;i<n;i++)if(r[i]==="\\")i++;else if(r[i]===e[0])t++;else if(r[i]===e[1]&&(t--,t<0))return i;return-1}function K(r){r&&r.sanitize&&!r.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function F(r,e){if(e<1)return"";let n="";for(;e>1;)e&1&&(n+=r),e>>=1,r+=r;return n+r}function H(r,e,n,t){let i=e.href,s=e.title?w(e.title):null,l=r[1].replace(/\\([\[\]])/g,"$1");if(r[0].charAt(0)!=="!"){t.state.inLink=!0;let a={type:"link",raw:n,href:i,title:s,text:l,tokens:t.inlineTokens(l)};return t.state.inLink=!1,a}return{type:"image",raw:n,href:i,title:s,text:w(l)}}function de(r,e){let n=r.match(/^(\s+)(?:```)/);if(n===null)return e;let t=n[1];return e.split(`
`).map(i=>{let s=i.match(/^\s+/);if(s===null)return i;let[l]=s;return l.length>=t.length?i.slice(t.length):i}).join(`
`)}var C=class{constructor(e){this.options=e||q}space(e){let n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){let n=this.rules.block.code.exec(e);if(n){let t=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?t:v(t,`
`)}}}fences(e){let n=this.rules.block.fences.exec(e);if(n){let t=n[0],i=de(t,n[3]||"");return{type:"code",raw:t,lang:n[2]?n[2].trim().replace(this.rules.inline._escapes,"$1"):n[2],text:i}}}heading(e){let n=this.rules.block.heading.exec(e);if(n){let t=n[2].trim();if(/#$/.test(t)){let i=v(t,"#");(this.options.pedantic||!i||/ $/.test(i))&&(t=i.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(e){let n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]}}blockquote(e){let n=this.rules.block.blockquote.exec(e);if(n){let t=n[0].replace(/^ *>[ \t]?/gm,""),i=this.lexer.state.top;this.lexer.state.top=!0;let s=this.lexer.blockTokens(t);return this.lexer.state.top=i,{type:"blockquote",raw:n[0],tokens:s,text:t}}}list(e){let n=this.rules.block.list.exec(e);if(n){let t,i,s,l,a,c,g,f,b,d,u,S,_=n[1].trim(),I=_.length>1,k={type:"list",raw:"",ordered:I,start:I?+_.slice(0,-1):"",loose:!1,items:[]};_=I?`\\d{1,9}\\${_.slice(-1)}`:`\\${_}`,this.options.pedantic&&(_=I?_:"[*+-]");let x=new RegExp(`^( {0,3}${_})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(S=!1,!(!(n=x.exec(e))||this.rules.block.hr.test(e)));){if(t=n[0],e=e.substring(t.length),f=n[2].split(`
`,1)[0],b=e.split(`
`,1)[0],this.options.pedantic?(l=2,u=f.trimLeft()):(l=n[2].search(/[^ ]/),l=l>4?1:l,u=f.slice(l),l+=n[1].length),c=!1,!f&&/^ *$/.test(b)&&(t+=b+`
`,e=e.substring(b.length+1),S=!0),!S){let A=new RegExp(`^ {0,${Math.min(3,l-1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`),T=new RegExp(`^ {0,${Math.min(3,l-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),R=new RegExp(`^ {0,${Math.min(3,l-1)}}(?:\`\`\`|~~~)`),D=new RegExp(`^ {0,${Math.min(3,l-1)}}#`);for(;e&&(d=e.split(`
`,1)[0],f=d,this.options.pedantic&&(f=f.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(R.test(f)||D.test(f)||A.test(f)||T.test(e)));){if(f.search(/[^ ]/)>=l||!f.trim())u+=`
`+f.slice(l);else if(!c)u+=`
`+f;else break;!c&&!f.trim()&&(c=!0),t+=d+`
`,e=e.substring(d.length+1)}}k.loose||(g?k.loose=!0:/\n *\n *$/.test(t)&&(g=!0)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(u),i&&(s=i[0]!=="[ ] ",u=u.replace(/^\[[ xX]\] +/,""))),k.items.push({type:"list_item",raw:t,task:!!i,checked:s,loose:!1,text:u}),k.raw+=t}k.items[k.items.length-1].raw=t.trimRight(),k.items[k.items.length-1].text=u.trimRight(),k.raw=k.raw.trimRight();let E=k.items.length;for(a=0;a<E;a++)if(this.lexer.state.top=!1,k.items[a].tokens=this.lexer.blockTokens(k.items[a].text,[]),!k.loose){let A=k.items[a].tokens.filter(R=>R.type==="space"),T=A.length>0&&A.some(R=>/\n.*\n/.test(R.raw));k.loose=T}if(k.loose)for(a=0;a<E;a++)k.items[a].loose=!0;return k}}html(e){let n=this.rules.block.html.exec(e);if(n){let t={type:"html",raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};if(this.options.sanitize){let i=this.options.sanitizer?this.options.sanitizer(n[0]):w(n[0]);t.type="paragraph",t.text=i,t.tokens=this.lexer.inline(i)}return t}}def(e){let n=this.rules.block.def.exec(e);if(n){let t=n[1].toLowerCase().replace(/\s+/g," "),i=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",s=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline._escapes,"$1"):n[3];return{type:"def",tag:t,raw:n[0],href:i,title:s}}}table(e){let n=this.rules.block.table.exec(e);if(n){let t={type:"table",header:N(n[1]).map(i=>({text:i})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(t.header.length===t.align.length){t.raw=n[0];let i=t.align.length,s,l,a,c;for(s=0;s<i;s++)/^ *-+: *$/.test(t.align[s])?t.align[s]="right":/^ *:-+: *$/.test(t.align[s])?t.align[s]="center":/^ *:-+ *$/.test(t.align[s])?t.align[s]="left":t.align[s]=null;for(i=t.rows.length,s=0;s<i;s++)t.rows[s]=N(t.rows[s],t.header.length).map(g=>({text:g}));for(i=t.header.length,l=0;l<i;l++)t.header[l].tokens=this.lexer.inline(t.header[l].text);for(i=t.rows.length,l=0;l<i;l++)for(c=t.rows[l],a=0;a<c.length;a++)c[a].tokens=this.lexer.inline(c[a].text);return t}}}lheading(e){let n=this.rules.block.lheading.exec(e);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(e){let n=this.rules.block.paragraph.exec(e);if(n){let t=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:t,tokens:this.lexer.inline(t)}}}text(e){let n=this.rules.block.text.exec(e);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(e){let n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:w(n[1])}}tag(e){let n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):w(n[0]):n[0]}}link(e){let n=this.rules.inline.link.exec(e);if(n){let t=n[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;let l=v(t.slice(0,-1),"\\");if((t.length-l.length)%2===0)return}else{let l=ge(n[2],"()");if(l>-1){let c=(n[0].indexOf("!")===0?5:4)+n[1].length+l;n[2]=n[2].substring(0,l),n[0]=n[0].substring(0,c).trim(),n[3]=""}}let i=n[2],s="";if(this.options.pedantic){let l=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);l&&(i=l[1],s=l[3])}else s=n[3]?n[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(t)?i=i.slice(1):i=i.slice(1,-1)),H(n,{href:i&&i.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer)}}reflink(e,n){let t;if((t=this.rules.inline.reflink.exec(e))||(t=this.rules.inline.nolink.exec(e))){let i=(t[2]||t[1]).replace(/\s+/g," ");if(i=n[i.toLowerCase()],!i){let s=t[0].charAt(0);return{type:"text",raw:s,text:s}}return H(t,i,t[0],this.lexer)}}emStrong(e,n,t=""){let i=this.rules.inline.emStrong.lDelim.exec(e);if(!i||i[3]&&t.match(/[\p{L}\p{N}]/u))return;let s=i[1]||i[2]||"";if(!s||s&&(t===""||this.rules.inline.punctuation.exec(t))){let l=i[0].length-1,a,c,g=l,f=0,b=i[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(b.lastIndex=0,n=n.slice(-1*e.length+l);(i=b.exec(n))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(c=a.length,i[3]||i[4]){g+=c;continue}else if((i[5]||i[6])&&l%3&&!((l+c)%3)){f+=c;continue}if(g-=c,g>0)continue;c=Math.min(c,c+g+f);let d=e.slice(0,l+i.index+(i[0].length-a.length)+c);if(Math.min(l,c)%2){let S=d.slice(1,-1);return{type:"em",raw:d,text:S,tokens:this.lexer.inlineTokens(S)}}let u=d.slice(2,-2);return{type:"strong",raw:d,text:u,tokens:this.lexer.inlineTokens(u)}}}}codespan(e){let n=this.rules.inline.code.exec(e);if(n){let t=n[2].replace(/\n/g," "),i=/[^ ]/.test(t),s=/^ /.test(t)&&/ $/.test(t);return i&&s&&(t=t.substring(1,t.length-1)),t=w(t,!0),{type:"codespan",raw:n[0],text:t}}}br(e){let n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){let n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(e,n){let t=this.rules.inline.autolink.exec(e);if(t){let i,s;return t[2]==="@"?(i=w(this.options.mangle?n(t[1]):t[1]),s="mailto:"+i):(i=w(t[1]),s=i),{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}url(e,n){let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=w(this.options.mangle?n(t[0]):t[0]),s="mailto:"+i;else{let l;do l=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])[0];while(l!==t[0]);i=w(t[0]),t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e,n){let t=this.rules.inline.text.exec(e);if(t){let i;return this.lexer.state.inRawBlock?i=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):w(t[0]):t[0]:i=w(this.options.smartypants?n(t[0]):t[0]),{type:"text",raw:t[0],text:i}}}},h={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:B,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};h._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;h._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;h.def=m(h.def).replace("label",h._label).replace("title",h._title).getRegex();h.bullet=/(?:[*+-]|\d{1,9}[.)])/;h.listItemStart=m(/^( *)(bull) */).replace("bull",h.bullet).getRegex();h.list=m(h.list).replace(/bull/g,h.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+h.def.source+")").getRegex();h._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";h._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;h.html=m(h.html,"i").replace("comment",h._comment).replace("tag",h._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();h.paragraph=m(h._paragraph).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.blockquote=m(h.blockquote).replace("paragraph",h.paragraph).getRegex();h.normal=z({},h);h.gfm=z({},h.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"});h.gfm.table=m(h.gfm.table).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.gfm.paragraph=m(h._paragraph).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",h.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.pedantic=z({},h.normal,{html:m(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",h._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:B,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:m(h.normal._paragraph).replace("hr",h.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",h.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});var o={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:B,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:B,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};o._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";o.punctuation=m(o.punctuation).replace(/punctuation/g,o._punctuation).getRegex();o.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;o.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g;o._comment=m(h._comment).replace("(?:-->|$)","-->").getRegex();o.emStrong.lDelim=m(o.emStrong.lDelim).replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimAst=m(o.emStrong.rDelimAst,"g").replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimUnd=m(o.emStrong.rDelimUnd,"g").replace(/punct/g,o._punctuation).getRegex();o._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;o._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;o._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;o.autolink=m(o.autolink).replace("scheme",o._scheme).replace("email",o._email).getRegex();o._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;o.tag=m(o.tag).replace("comment",o._comment).replace("attribute",o._attribute).getRegex();o._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;o._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;o._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;o.link=m(o.link).replace("label",o._label).replace("href",o._href).replace("title",o._title).getRegex();o.reflink=m(o.reflink).replace("label",o._label).replace("ref",h._label).getRegex();o.nolink=m(o.nolink).replace("ref",h._label).getRegex();o.reflinkSearch=m(o.reflinkSearch,"g").replace("reflink",o.reflink).replace("nolink",o.nolink).getRegex();o.normal=z({},o);o.pedantic=z({},o.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:m(/^!?\[(label)\]\((.*?)\)/).replace("label",o._label).getRegex(),reflink:m(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",o._label).getRegex()});o.gfm=z({},o.normal,{escape:m(o.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/});o.gfm.url=m(o.gfm.url,"i").replace("email",o.gfm._extended_email).getRegex();o.breaks=z({},o.gfm,{br:m(o.br).replace("{2,}","*").getRegex(),text:m(o.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});function me(r){return r.replace(/---/g,"\u2014").replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C").replace(/"/g,"\u201D").replace(/\.{3}/g,"\u2026")}function X(r){let e="",n,t,i=r.length;for(n=0;n<i;n++)t=r.charCodeAt(n),Math.random()>.5&&(t="x"+t.toString(16)),e+="&#"+t+";";return e}var $=class{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||q,this.options.tokenizer=this.options.tokenizer||new C,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={block:h.normal,inline:o.normal};this.options.pedantic?(n.block=h.pedantic,n.inline=o.pedantic):this.options.gfm&&(n.block=h.gfm,this.options.breaks?n.inline=o.breaks:n.inline=o.gfm),this.tokenizer.rules=n}static get rules(){return{block:h,inline:o}}static lex(e,n){return new $(n).lex(e)}static lexInline(e,n){return new $(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(e,n=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(a,c,g)=>c+"    ".repeat(g.length));let t,i,s,l;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(a=>(t=a.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.space(e)){e=e.substring(t.raw.length),t.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(t);continue}if(t=this.tokenizer.code(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t);continue}if(t=this.tokenizer.fences(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.heading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.hr(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.blockquote(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.list(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.html(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.def(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+t.raw,i.text+=`
`+t.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title});continue}if(t=this.tokenizer.table(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.lheading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(s=e,this.options.extensions&&this.options.extensions.startBlock){let a=1/0,c=e.slice(1),g;this.options.extensions.startBlock.forEach(function(f){g=f.call({lexer:this},c),typeof g=="number"&&g>=0&&(a=Math.min(a,g))}),a<1/0&&a>=0&&(s=e.substring(0,a+1))}if(this.state.top&&(t=this.tokenizer.paragraph(s))){i=n[n.length-1],l&&i.type==="paragraph"?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t),l=s.length!==e.length,e=e.substring(t.raw.length);continue}if(t=this.tokenizer.text(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&i.type==="text"?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t);continue}if(e){let a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let t,i,s,l=e,a,c,g;if(this.tokens.links){let f=Object.keys(this.tokens.links);if(f.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(l))!=null;)f.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,a.index)+"["+F("a",a[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.blockSkip.exec(l))!=null;)l=l.slice(0,a.index)+"["+F("a",a[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(a=this.tokenizer.rules.inline.escapedEmSt.exec(l))!=null;)l=l.slice(0,a.index+a[0].length-2)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;e;)if(c||(g=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(f=>(t=f.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.escape(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.tag(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&t.type==="text"&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(t=this.tokenizer.link(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(t.raw.length),i=n[n.length-1],i&&t.type==="text"&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(t=this.tokenizer.emStrong(e,l,g)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.codespan(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.br(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.del(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.autolink(e,X)){e=e.substring(t.raw.length),n.push(t);continue}if(!this.state.inLink&&(t=this.tokenizer.url(e,X))){e=e.substring(t.raw.length),n.push(t);continue}if(s=e,this.options.extensions&&this.options.extensions.startInline){let f=1/0,b=e.slice(1),d;this.options.extensions.startInline.forEach(function(u){d=u.call({lexer:this},b),typeof d=="number"&&d>=0&&(f=Math.min(f,d))}),f<1/0&&f>=0&&(s=e.substring(0,f+1))}if(t=this.tokenizer.inlineText(s,me)){e=e.substring(t.raw.length),t.raw.slice(-1)!=="_"&&(g=t.raw.slice(-1)),c=!0,i=n[n.length-1],i&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},L=class{constructor(e){this.options=e||q}code(e,n,t){let i=(n||"").match(/\S*/)[0];if(this.options.highlight){let s=this.options.highlight(e,i);s!=null&&s!==e&&(t=!0,e=s)}return e=e.replace(/\n$/,"")+`
`,i?'<pre><code class="'+this.options.langPrefix+w(i)+'">'+(t?e:w(e,!0))+`</code></pre>
`:"<pre><code>"+(t?e:w(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e){return e}heading(e,n,t,i){if(this.options.headerIds){let s=this.options.headerPrefix+i.slug(t);return`<h${n} id="${s}">${e}</h${n}>
`}return`<h${n}>${e}</h${n}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,n,t){let i=n?"ol":"ul",s=n&&t!==1?' start="'+t+'"':"";return"<"+i+s+`>
`+e+"</"+i+`>
`}listitem(e){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>
`}table(e,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,n){let t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,n,t){if(e=P(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let i='<a href="'+e+'"';return n&&(i+=' title="'+n+'"'),i+=">"+t+"</a>",i}image(e,n,t){if(e=P(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let i=`<img src="${e}" alt="${t}"`;return n&&(i+=` title="${n}"`),i+=this.options.xhtml?"/>":">",i}text(e){return e}},O=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,n,t){return""+t}image(e,n,t){return""+t}br(){return""}},M=class{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,n){let t=e,i=0;if(this.seen.hasOwnProperty(t)){i=this.seen[e];do i++,t=e+"-"+i;while(this.seen.hasOwnProperty(t))}return n||(this.seen[e]=i,this.seen[t]=0),t}slug(e,n={}){let t=this.serialize(e);return this.getNextSafeSlug(t,n.dryrun)}},y=class{constructor(e){this.options=e||q,this.options.renderer=this.options.renderer||new L,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new O,this.slugger=new M}static parse(e,n){return new y(n).parse(e)}static parseInline(e,n){return new y(n).parseInline(e)}parse(e,n=!0){let t="",i,s,l,a,c,g,f,b,d,u,S,_,I,k,x,E,A,T,R,D=e.length;for(i=0;i<D;i++){if(u=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[u.type]&&(R=this.options.extensions.renderers[u.type].call({parser:this},u),R!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(u.type))){t+=R||"";continue}switch(u.type){case"space":continue;case"hr":{t+=this.renderer.hr();continue}case"heading":{t+=this.renderer.heading(this.parseInline(u.tokens),u.depth,J(this.parseInline(u.tokens,this.textRenderer)),this.slugger);continue}case"code":{t+=this.renderer.code(u.text,u.lang,u.escaped);continue}case"table":{for(b="",f="",a=u.header.length,s=0;s<a;s++)f+=this.renderer.tablecell(this.parseInline(u.header[s].tokens),{header:!0,align:u.align[s]});for(b+=this.renderer.tablerow(f),d="",a=u.rows.length,s=0;s<a;s++){for(g=u.rows[s],f="",c=g.length,l=0;l<c;l++)f+=this.renderer.tablecell(this.parseInline(g[l].tokens),{header:!1,align:u.align[l]});d+=this.renderer.tablerow(f)}t+=this.renderer.table(b,d);continue}case"blockquote":{d=this.parse(u.tokens),t+=this.renderer.blockquote(d);continue}case"list":{for(S=u.ordered,_=u.start,I=u.loose,a=u.items.length,d="",s=0;s<a;s++)x=u.items[s],E=x.checked,A=x.task,k="",x.task&&(T=this.renderer.checkbox(E),I?x.tokens.length>0&&x.tokens[0].type==="paragraph"?(x.tokens[0].text=T+" "+x.tokens[0].text,x.tokens[0].tokens&&x.tokens[0].tokens.length>0&&x.tokens[0].tokens[0].type==="text"&&(x.tokens[0].tokens[0].text=T+" "+x.tokens[0].tokens[0].text)):x.tokens.unshift({type:"text",text:T}):k+=T),k+=this.parse(x.tokens,I),d+=this.renderer.listitem(k,A,E);t+=this.renderer.list(d,S,_);continue}case"html":{t+=this.renderer.html(u.text);continue}case"paragraph":{t+=this.renderer.paragraph(this.parseInline(u.tokens));continue}case"text":{for(d=u.tokens?this.parseInline(u.tokens):u.text;i+1<D&&e[i+1].type==="text";)u=e[++i],d+=`
`+(u.tokens?this.parseInline(u.tokens):u.text);t+=n?this.renderer.paragraph(d):d;continue}default:{let j='Token with "'+u.type+'" type was not found.';if(this.options.silent){console.error(j);return}else throw new Error(j)}}}return t}parseInline(e,n){n=n||this.renderer;let t="",i,s,l,a=e.length;for(i=0;i<a;i++){if(s=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]&&(l=this.options.extensions.renderers[s.type].call({parser:this},s),l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type))){t+=l||"";continue}switch(s.type){case"escape":{t+=n.text(s.text);break}case"html":{t+=n.html(s.text);break}case"link":{t+=n.link(s.href,s.title,this.parseInline(s.tokens,n));break}case"image":{t+=n.image(s.href,s.title,s.text);break}case"strong":{t+=n.strong(this.parseInline(s.tokens,n));break}case"em":{t+=n.em(this.parseInline(s.tokens,n));break}case"codespan":{t+=n.codespan(s.text);break}case"br":{t+=n.br();break}case"del":{t+=n.del(this.parseInline(s.tokens,n));break}case"text":{t+=n.text(s.text);break}default:{let c='Token with "'+s.type+'" type was not found.';if(this.options.silent){console.error(c);return}else throw new Error(c)}}}return t}};function p(r,e,n){if(typeof r>"u"||r===null)throw new Error("marked(): input parameter is undefined or null");if(typeof r!="string")throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected");if(typeof e=="function"&&(n=e,e=null),e=z({},p.defaults,e||{}),K(e),n){let i=e.highlight,s;try{s=$.lex(r,e)}catch(c){return n(c)}let l=function(c){let g;if(!c)try{e.walkTokens&&p.walkTokens(s,e.walkTokens),g=y.parse(s,e)}catch(f){c=f}return e.highlight=i,c?n(c):n(null,g)};if(!i||i.length<3||(delete e.highlight,!s.length))return l();let a=0;p.walkTokens(s,function(c){c.type==="code"&&(a++,setTimeout(()=>{i(c.text,c.lang,function(g,f){if(g)return l(g);f!=null&&f!==c.text&&(c.text=f,c.escaped=!0),a--,a===0&&l()})},0))}),a===0&&l();return}function t(i){if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+w(i.message+"",!0)+"</pre>";throw i}try{let i=$.lex(r,e);if(e.walkTokens){if(e.async)return Promise.all(p.walkTokens(i,e.walkTokens)).then(()=>y.parse(i,e)).catch(t);p.walkTokens(i,e.walkTokens)}return y.parse(i,e)}catch(i){t(i)}}p.options=p.setOptions=function(r){return z(p.defaults,r),ne(p.defaults),p};p.getDefaults=W;p.defaults=q;p.use=function(...r){let e=p.defaults.extensions||{renderers:{},childTokens:{}};r.forEach(n=>{let t=z({},n);if(t.async=p.defaults.async||t.async,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if(i.renderer){let s=e.renderers[i.name];s?e.renderers[i.name]=function(...l){let a=i.renderer.apply(this,l);return a===!1&&(a=s.apply(this,l)),a}:e.renderers[i.name]=i.renderer}if(i.tokenizer){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");e[i.level]?e[i.level].unshift(i.tokenizer):e[i.level]=[i.tokenizer],i.start&&(i.level==="block"?e.startBlock?e.startBlock.push(i.start):e.startBlock=[i.start]:i.level==="inline"&&(e.startInline?e.startInline.push(i.start):e.startInline=[i.start]))}i.childTokens&&(e.childTokens[i.name]=i.childTokens)}),t.extensions=e),n.renderer){let i=p.defaults.renderer||new L;for(let s in n.renderer){let l=i[s];i[s]=(...a)=>{let c=n.renderer[s].apply(i,a);return c===!1&&(c=l.apply(i,a)),c}}t.renderer=i}if(n.tokenizer){let i=p.defaults.tokenizer||new C;for(let s in n.tokenizer){let l=i[s];i[s]=(...a)=>{let c=n.tokenizer[s].apply(i,a);return c===!1&&(c=l.apply(i,a)),c}}t.tokenizer=i}if(n.walkTokens){let i=p.defaults.walkTokens;t.walkTokens=function(s){let l=[];return l.push(n.walkTokens.call(this,s)),i&&(l=l.concat(i.call(this,s))),l}}p.setOptions(t)})};p.walkTokens=function(r,e){let n=[];for(let t of r)switch(n=n.concat(e.call(p,t)),t.type){case"table":{for(let i of t.header)n=n.concat(p.walkTokens(i.tokens,e));for(let i of t.rows)for(let s of i)n=n.concat(p.walkTokens(s.tokens,e));break}case"list":{n=n.concat(p.walkTokens(t.items,e));break}default:p.defaults.extensions&&p.defaults.extensions.childTokens&&p.defaults.extensions.childTokens[t.type]?p.defaults.extensions.childTokens[t.type].forEach(function(i){n=n.concat(p.walkTokens(t[i],e))}):t.tokens&&(n=n.concat(p.walkTokens(t.tokens,e)))}return n};p.parseInline=function(r,e){if(typeof r>"u"||r===null)throw new Error("marked.parseInline(): input parameter is undefined or null");if(typeof r!="string")throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected");e=z({},p.defaults,e||{}),K(e);try{let n=$.lexInline(r,e);return e.walkTokens&&p.walkTokens(n,e.walkTokens),y.parseInline(n,e)}catch(n){if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+w(n.message+"",!0)+"</pre>";throw n}};p.Parser=y;p.parser=y.parse;p.Renderer=L;p.TextRenderer=O;p.Lexer=$;p.lexer=$.lex;p.Tokenizer=C;p.Slugger=M;p.parse=p;var ke=p.options,xe=p.setOptions,we=p.use,be=p.walkTokens,ye=p.parseInline;var _e=y.parse,$e=$.lex;function Y(r,...e){let n="";return r.forEach((t,i)=>{n+=t+e[i]}),n}function U(r,{disabled:e}){let{body:n,choices:t}=r,i=p.parse(n),s=t.map(l=>p.parse(l));return Y`
    <style>
      .question {
        max-width: 100%;
      }
      .question img {
        width: 100%;
        height: auto;
      }
      .question input[type="radio"] {
        min-width: 5em;
        appearance: none;
        margin: 0;
      }
      .question label {
      }
      .question label:hover {
      }
    </style>
    ${i}
    ${s.map((l,a)=>Y`
          <div class="question">
            <label class="form-check-label" for="choice-${a}">
              <input
                name="answer"
                type="radio"
                name="answer"
                id="choice-${a}"
              />
              ${l}
            </label>
          </div>
        `).join("")}
  `}var ee=document.querySelector("#question-preview");function te(r){let e=new FormData(r),n=e.get("body"),t=e.getAll("choices");ee.innerHTML=U({body:n,choices:t},{disabled:!0}),renderMathInElement(ee,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1}]})}te(document.querySelector("form"));document.querySelector("form").addEventListener("input",r=>te(r.target.form));})();
//# sourceMappingURL=edit-question.js.map
