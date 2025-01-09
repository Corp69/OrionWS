export const fileFilterPfx = (req: Express.Request, file: Express.Multer.File, callback: Function,) => {
    if (!file) {
        return callback(new Error('Archivo Está Vacio'), false);
    }
    // Extraer la extensión del archivo
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    // Definir las extensiones válidas
    const validExtensions = ['pfx'];
    
    // Comprobar si la extensión es válida
    if (validExtensions.includes(fileExtension ?? '')) {
        return callback(null, true);
    }
    callback(null, false);
};
      