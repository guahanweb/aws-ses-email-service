import * as fs from 'fs'
import * as path from 'path'

if (require.main === module) {
    main();
}

export function main() {
    if (process.argv.length < 3) {
        console.log('Missing argument: no email template provided');
        process.exit(1);
    }

    const emailIdentifier = process.argv[2];

    // check output path
    const OUTPUT_PATH = path.resolve(__dirname, '../dist/templates');
    if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH, { recursive: true });

    // validate requested template
    const TEMPLATE_PATH = path.resolve(__dirname, emailIdentifier);
    if (!fs.existsSync(TEMPLATE_PATH)) throw new Error('Invalid email identifier provided');

    const template = buildSESTemplate(TEMPLATE_PATH);
    const output = JSON.stringify(template, null, 2);
    fs.writeFileSync(
        path.resolve(OUTPUT_PATH, `${emailIdentifier}.json`),
        output
    );
}

function buildSESTemplate(templatePath: string) {
    const dataPath = path.join(templatePath, 'config.json');
    const htmlPath = path.join(templatePath, 'content.html');
    const textPath = path.join(templatePath, 'content.txt');

    if ([dataPath, htmlPath, textPath].some((filepath: string) => !fs.existsSync(filepath)))
        throw new Error('Provided template is missing required documents');

    // build it here
    const data = JSON.parse(fs.readFileSync(dataPath).toString());
    const HtmlPart = fs.readFileSync(htmlPath).toString();
    const TextPart = fs.readFileSync(textPath).toString();

    return {
        Template: {
            ...data,
            HtmlPart,
            TextPart,
        }
    };
}
