const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const targets = [
  {
    name: 'uJ pathname',
    pattern: 'pathname:Q.pathname.replace(/\\/+$/,"")',
    start: 1764500,
    end: 1764800
  },
  {
    name: 'onSetPreloaderLogic 1',
    pattern: 'onSetPreloaderLogic(A=!1){let Q=window.location.pathname;if(VA.isWebGlTransitioning=!0,Q=="/")',
    start: 971000,
    end: 971200
  },
  {
    name: 'onSetPreloaderLogic 2',
    pattern: 'onSetPreloaderLogic(A=!1){let Q=window.location.pathname;if(VA.isWebGlTransitioning=!0,Q=="/")',
    start: 1101300,
    end: 1101500
  },
  {
    name: 'E5 constructor url',
    pattern: 'this.url=window.location.pathname,this.dracoLoader',
    start: 1285400,
    end: 1285550
  },
  {
    name: 'manifesto click',
    pattern: 'if(ZA(window.location.pathname)==="/")',
    start: 1803700,
    end: 1803800
  },
  {
    name: 'LA active nav links',
    pattern: 'let WA=ZA(window.location.pathname);z.querySelectorAll("a").forEach((g)=>{if(ZA(g.pathname)===WA)',
    start: 1805700,
    end: 1805850
  }
];

targets.forEach((t) => {
  const segment = content.substring(t.start, t.end);
  const found = segment.includes(t.pattern);
  console.log(`Target [${t.name}]:`, found ? 'YES' : 'NO');
  if (!found) {
    console.log('Actual segment in range:', JSON.stringify(segment));
  }
});
