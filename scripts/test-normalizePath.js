// test-normalizePath.js - Teste simples para a função normalizePath
function normalizePath(p) {
    if (!p) return '/';
    let path = p.replace(/\\/g, '/').replace(/\/+/g, '/');
    path = path.split('?')[0].split('#')[0];
    path = path.replace(/\/index\.(html?|php)$/i, '/');
    path = path.replace(/\/$/, '') || '/';
    return path;
}

const tests = [
    { in: '/', out: '/' },
    { in: '/index.html', out: '/' },
    { in: '/index.php', out: '/' },
    { in: '/about/', out: '/about' },
    { in: 'about', out: '/about' },
    { in: '/path//to///resource', out: '/path/to/resource' },
    { in: 'C:\\site\\index.html', out: '/' },
    { in: '/page?query=1#hash', out: '/page' },
    { in: '/nested/index.html?x=1#y', out: '/nested' },
    { in: '/nested/page.html', out: '/nested/page.html' }
];

let failed = 0;
tests.forEach(t => {
    const res = normalizePath(t.in);
    const ok = res === t.out;
    if (!ok) {
        console.error(`FAIL: input=${t.in} expected=${t.out} got=${res}`);
        failed++;
    } else {
        console.log(`PASS: ${t.in} => ${res}`);
    }
});

if (failed === 0) {
    console.log(`All ${tests.length} tests passed.`);
    process.exit(0);
} else {
    console.error(`${failed} tests failed.`);
    process.exit(1);
}
