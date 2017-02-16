const fs = require('fs');
const path = require('path');

const name = process.argv[2];

const dirPath = `dev/components/${name}`;

const jsPath = path.join(dirPath, 'index.js');
const jsContent =
`import ${name} from './${name}';
export default ${name};
`;

const scssPath = path.join(dirPath, `${name}.scss`);
const scssContent =
`.${name} {

}

`;

const jsxPath = path.join(dirPath, `${name}.jsx`);
const jsxContent =
`import React, {Component} from 'react';
import classnames from 'classnames';

import scss from './${name}.scss';

class ${name} extends Component {
    render() {
        return (
            <div className={classnames(
                scss.${name}
            )}>
            </div>
        );
    }
}

export default ${name};
`;


if (fs.existsSync(dirPath)) {
    console.log('========== folder exist ==========');
} else {
    fs.mkdirSync(dirPath);

    fs.writeFileSync(jsPath, jsContent);
    fs.writeFileSync(scssPath, scssContent);
    fs.writeFileSync(jsxPath, jsxContent);
}
