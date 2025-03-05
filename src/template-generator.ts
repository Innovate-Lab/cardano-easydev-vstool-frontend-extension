import path from "path";
import fs from 'fs/promises';

interface FileNode {
    name: string;
    type: 'file' | 'directory';
    path: string;
    content?: string;
    children?: FileNode[];
}

async function createDirectory(dirPath: string) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
            throw error;
        }
    }
}

async function createFile(filePath: string, content: string) {
    await fs.writeFile(filePath, content, 'utf-8');
}

async function processNode(node: FileNode, baseDir: string) {
    const fullPath = path.join(baseDir, node.path);

    if (node.type === 'directory') {
        await createDirectory(fullPath);
        if (node.children) {
            for (const child of node.children) {
                await processNode(child, baseDir);
            }
        }
    } else if (node.type === 'file' && node.content !== undefined) {
        await createFile(fullPath, node.content);
    }
}

interface GenerateFromTemplatePayload {
    template: {
        children: FileNode[];
    };
    metadata: {
        projectPath: string;
    };
}

export async function generateFromTemplate(payload: GenerateFromTemplatePayload): Promise<boolean> {
    try {
        if (!payload.template || !Array.isArray(payload.template.children)) {
            throw new Error('Invalid payload structure');
        }

        // Create the base directory
        await createDirectory(payload.metadata.projectPath);

        // Process each child node
        for (const child of payload.template.children) {
            await processNode(child, payload.metadata.projectPath);
        }

        return true;
    } catch (error) {
        console.error('Error generating template:', error);
        return false;
    }
}