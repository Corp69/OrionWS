export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    // console.log({ file })
    if ( !file ) return callback( new Error('Archivo Está Vacio'), false );
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${ file.filename }.${ fileExtension }`;
    callback(null, fileName );
}