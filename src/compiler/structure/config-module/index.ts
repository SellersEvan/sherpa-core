import { Files } from "../../files";
import { Message } from "../../logger/model";
import { CONTEXT_SCHEMA_TYPE_NAME, FILENAME_CONFIG_MODULE, ModuleStructure, SUPPORTED_FILE_EXTENSIONS, ModuleConfig } from "../../models";
import { Tooling } from "../../tooling";


export async function getModuleStructure(entry:string):Promise<{ errors:Message[], module?:ModuleStructure }> {
    let { filepath, errors: errorsFilepath } = getFilepath(entry);
    if (!filepath) return { errors: errorsFilepath };

    let { instance, errors: errorsInstance } = await getInstance(filepath);
    if (!instance) return { errors: errorsInstance };

    //! FIXME - Verify types, rebuild type checker in tooling

    return {
        module: {
            filepath: filepath,
            instance: instance,
            hasContextSchema: hasContextSchema(filepath)
        },
        errors: []
    }
}


function getFilepath(entry:string):{ errors:Message[], filepath?:string } {
    let filepath = Files.getFilepathVariableExtension(
        entry,
        FILENAME_CONFIG_MODULE,
        SUPPORTED_FILE_EXTENSIONS
    );
    if (filepath) {
        return { filepath, errors: [] };
    }
    return {
        errors: [{
            text: "Module config file could not be found.",
            content: `Must have module config, "${FILENAME_CONFIG_MODULE}" `
                + `of type "${SUPPORTED_FILE_EXTENSIONS.join("\", \"")}".`,
            file: { filepath: entry }
        }]
    };
}


async function getInstance(filepath:string):Promise<{ errors:Message[], instance?:ModuleConfig }> {
    try {
        return {
            errors: [],
            instance: await Tooling.getDefaultExport(filepath) as ModuleConfig
        }
    } catch (e) {
        return {
            errors: [{
                text: "Module config file could not be processed.",
                content: `Ensure module config has default export.`,
                file: { filepath: filepath }
            }]
        };
    }
}


function hasContextSchema(filepath:string):boolean {
    let exportedVariables = Tooling.getExportedVariableNames(filepath);
    let exportedSchema    = exportedVariables.includes(CONTEXT_SCHEMA_TYPE_NAME);
    let isTypescript      = Files.getExtension(filepath) == "TS";
    return exportedSchema && isTypescript;
}

