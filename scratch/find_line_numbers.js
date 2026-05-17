const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');
const lines = content.split('\n');

const targets = [
  {
    name: 'uJ pathname',
    pattern: 'pathname:Q.pathname.replace(/\\/+$/,"")'
  },
  {
    name: 'onSetPreloaderLogic 1',
    pattern: 'onSetPreloaderLogic(A=!1){let Q=window.location.pathname;if(VA.isWebGlTransitioning=!0,Q=="/")'
  },
  {
    name: 'onSetPreloaderLogic 2',
    pattern: 'onSetPreloaderLogic(A=!1){let Q=window.location.pathname;if(VA.isWebGlTransitioning=!0,Q=="/")'
  },
  {
    name: 'E5 constructor url',
    pattern: 'this.url=window.location.pathname,this.dracoLoader'
  },
  {
    name: 'manifesto click',
    pattern: 'if(ZA(window.location.pathname)==="/")'
  },
  {
    name: 'LA active nav links',
    pattern: 'let WA=ZA(window.location.pathname);z.querySelectorAll("a").forEach((g)=>{if(ZA(g.pathname)===WA)'
  }
];

targets.forEach((t) => {
  let found = [];
  lines.forEach((line, idx) => {
    if (line.includes(t.pattern)) {
      found.push(idx + 1); // 1-indexed
    }
  });
  console.log(`Target [${t.name}]:`, found);
});
