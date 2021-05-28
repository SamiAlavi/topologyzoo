const fs = require('fs');

let details;
let obj;

const var_name = 'topology_zoo';
const dir = './gml/';
const final_details = [];

fs.readdirSync(dir).forEach(file => {
	details = fs.readFileSync(`${dir}${file}`, 'UTF-8');
	obj = {
		'graphml': `${file.split('.')[0]}.graphml`,
	};

	details.split(/\r?\n/).forEach((line) => {
		line = line.trim();
		if (
			line.startsWith('GeoLocation') ||
			line.startsWith('Network') ||
			line.startsWith('NetworkDate')
		) {
			line = line.split(', ').join(',').split('"').join('').split(' ');
			obj[line[0]] = line[1].split(',').join(', ')
		}
	});
	final_details.push(obj);
});

const json = JSON.stringify(final_details, null, 2);
const ts = `const ${var_name} = ${json};\n\nexport default ${var_name}`;

fs.writeFileSync(`${var_name}.ts`,ts);