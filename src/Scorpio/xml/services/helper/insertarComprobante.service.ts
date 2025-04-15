import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { clientHttp } from '@shared/client/clienthttp'; 
import { DataSource } from 'typeorm';

//entities


//manejo de errores
import { DBErrorHandlerService } from '@shared/errors/DBErrorHandlerService';
import { scorpio_xml_comprobante } from '../../entities/comprobantes/scorpio_xml_comprobante.entity';
import { scorpio_xml_comprobante_complemento } from '../../entities/comprobantes/scorpio_xml_comprobante_complemento.entity';
import { scorpio_xml_comprobante_conceptos } from '../../entities/comprobantes/scorpio_xml_comprobante_conceptos.entity';
import { scorpio_xml_comprobante_emisor } from '../../entities/comprobantes/scorpio_xml_comprobante_emisor.entity';
import { scorpio_xml_comprobante_impuestos } from '../../entities/comprobantes/scorpio_xml_comprobante_impuestos.entity';
import { scorpio_xml_comprobante_receptor } from '../../entities/comprobantes/scorpio_xml_comprobante_receptor.entity';

@Injectable()
export class insertarComprobante {
    
    constructor(
        private readonly clientHttp: clientHttp,
        private readonly dataSource: DataSource,
        private readonly dbErrorHandlerService: DBErrorHandlerService
    ) {}
    
    
    public async insertar( res:any ){
        
        const comprobanteRepo = this.dataSource.getRepository(scorpio_xml_comprobante);
        const comprobanteRepoReceptor = this.dataSource.getRepository(scorpio_xml_comprobante_receptor);
        const comprobanteRepoEmisor = this.dataSource.getRepository(scorpio_xml_comprobante_emisor);
        const comprobanteRepoComplemento = this.dataSource.getRepository(scorpio_xml_comprobante_complemento);    
        const comprobanteRepoConceptos = this.dataSource.getRepository(scorpio_xml_comprobante_conceptos);    
        const comprobanteRepoImpuestos = this.dataSource.getRepository(scorpio_xml_comprobante_impuestos);
        
        const comprobantesAInsertar       = [];
        const comprobantesAInsertarReceptor = [];
        const comprobantesAInsertarEmisor = [];
        const comprobantesAInsertarComplemento = [];
        const comprobantesAInsertarConceptos = [];
        const comprobantesAInsertarImpuestos = [];
        
        // Obtener todos los XMLs en paralelo
        const xmlResponses = await Promise.all(
            res.respuesta.map(url => this.clientHttp.getXml(url).catch(error => ({ error, url })))
        );
        
        for (const response of xmlResponses) {
            // Si hubo error con alguna URL, se omite y se loguea
            if (response.error) {
                continue;
            }
            
            for (const comprobante of response) {
                try {
                    const nuevoComprobante = comprobanteRepo.create({
                        id_xml_scorpio_tipo: 1,
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        fechatimbrado: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].FechaTimbrado,
                        cfdi: comprobante.data["cfdi:Comprobante"]["xmlns:cfdi"],
                        xsi: comprobante.data["cfdi:Comprobante"]["xmlns:xsi"],
                        schemalocation: comprobante.data["cfdi:Comprobante"]["xsi:schemaLocation"],
                        fecha: comprobante.data["cfdi:Comprobante"].Fecha,
                        sello: comprobante.data["cfdi:Comprobante"].Sello,
                        formapago: comprobante.data["cfdi:Comprobante"].FormaPago,
                        nocertificado: comprobante.data["cfdi:Comprobante"].NoCertificado,
                        certificado: comprobante.data["cfdi:Comprobante"].Certificado,
                        subtotal: comprobante.data["cfdi:Comprobante"].SubTotal,
                        moneda: comprobante.data["cfdi:Comprobante"].Moneda,
                        total: comprobante.data["cfdi:Comprobante"].Total,
                        tipodecomprobante: comprobante.data["cfdi:Comprobante"].TipoDeComprobante,
                        exportacion: comprobante.data["cfdi:Comprobante"].Exportacion,
                        metodopago: comprobante.data["cfdi:Comprobante"].MetodoPago,
                        lugarexpedicion: comprobante.data["cfdi:Comprobante"].LugarExpedicion
                    });
                    
                    const nuevoComprobanteReceptor = comprobanteRepoReceptor.create({
                        id_scorpio_xml_comprobante: 0,
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        rfc: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Rfc,
                        nombre: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Nombre,
                        domiciliofiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].DomicilioFiscalReceptor,
                        regimenfiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].RegimenFiscalReceptor,
                        usocfdi: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].UsoCFDI
                    });
                    
                    const nuevoComprobanteEmisor = comprobanteRepoEmisor.create({
                        id_scorpio_xml_comprobante: 0,
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        rfc: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].Rfc,
                        nombre: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].Nombre,
                        regimenfiscal: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].RegimenFiscal
                    });
                    
                    const nuevoComprobanteComplemento = comprobanteRepoComplemento.create({
                        id_scorpio_xml_comprobante: 0,
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        timbrefiscaldigital:{
                            xmlns: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"]["xmlns:tfd"],
                            
                            xsi: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"]["xsi:schemaLocation"],
                            
                            Version: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].Version,
                            
                            UUID: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                            
                            FechaTimbrado: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].FechaTimbrado,
                            
                            RfcProvCertif: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].RfcProvCertif,
                            
                            SelloCFD: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].SelloCFD,
                            
                            NoCertificadoSAT: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].NoCertificadoSAT,
                            
                            SelloSAT: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children
                            .find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].SelloSAT
                        },
                    });
                    
                    const nuevoComprobanteConceptos = comprobanteRepoConceptos.create({
                        id_scorpio_xml_comprobante: 0,
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        concepto:{
                            ClaveProdServ: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].ClaveProdServ,
                            
                            Cantidad: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].Cantidad,
                            
                            ClaveUnidad: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].ClaveUnidad,
                            
                            Unidad: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].Unidad,
                            
                            Descripcion: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].Descripcion,
                            
                            ValorUnitario: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].ValorUnitario,
                            
                            Importe: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].Importe,
                            
                            ObjetoImp: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Conceptos"])?.["cfdi:Conceptos"].children
                            .find(c => c["cfdi:Concepto"])?.["cfdi:Concepto"].ObjetoImp,
                            
                        }, 
                    });
                    
                    const nuevoComprobanteImpuestos = comprobanteRepoImpuestos.create({
                        id_scorpio_xml_comprobante: 0,
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        totalimpuestostrasladados:comprobante.data["cfdi:Comprobante"].children
                        .find(c => c["cfdi:Impuestos"])?.["cfdi:Impuestos"].TotalImpuestosTrasladados,
                        traslados:{
                            Base: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Impuestos"])?.["cfdi:Impuestos"].children
                            .find(c => c["cfdi:Traslados"])?.["cfdi:Traslados"].children
                            .find(c => c["cfdi:Traslado"])?.["cfdi:Traslado"].Base,
                            
                            Impuesto: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Impuestos"])?.["cfdi:Impuestos"].children
                            .find(c => c["cfdi:Traslados"])?.["cfdi:Traslados"].children
                            .find(c => c["cfdi:Traslado"])?.["cfdi:Traslado"].Impuesto,
                            
                            TipoFactor: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Impuestos"])?.["cfdi:Impuestos"].children
                            .find(c => c["cfdi:Traslados"])?.["cfdi:Traslados"].children
                            .find(c => c["cfdi:Traslado"])?.["cfdi:Traslado"].TipoFactor,
                            
                            TasaOCuota: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Impuestos"])?.["cfdi:Impuestos"].children
                            .find(c => c["cfdi:Traslados"])?.["cfdi:Traslados"].children
                            .find(c => c["cfdi:Traslado"])?.["cfdi:Traslado"].TasaOCuota,
                            
                            Importe: comprobante.data["cfdi:Comprobante"].children
                            .find(c => c["cfdi:Impuestos"])?.["cfdi:Impuestos"].children
                            .find(c => c["cfdi:Traslados"])?.["cfdi:Traslados"].children
                            .find(c => c["cfdi:Traslado"])?.["cfdi:Traslado"].Importe,
                        },  
                    });
                    
                    comprobantesAInsertar.push(nuevoComprobante);
                    comprobantesAInsertarReceptor.push(nuevoComprobanteReceptor);
                    comprobantesAInsertarEmisor.push(nuevoComprobanteEmisor);
                    comprobantesAInsertarConceptos.push(nuevoComprobanteConceptos);
                    comprobantesAInsertarComplemento.push(nuevoComprobanteComplemento);
                    comprobantesAInsertarImpuestos.push(nuevoComprobanteImpuestos);                    
                    
                } catch (error) {
                    const uuid = comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID;
                    if (this.dbErrorHandlerService.handleDBErrors(error)) {
                    } else {
                        throw new HttpException(
                            {
                                Success: false,
                                Titulo: 'OrionWS: Scorpio XL - Modulo XML - Multicomprobantes Verificar',
                                Mensaje: 'Operación no se realizó',
                                Response: this.dbErrorHandlerService.handleDBErrors(error) || error,
                            },
                            HttpStatus.OK,
                        );
                    }
                }
            }
        }
   
        // Inserción en bloques de 20000
        const BATCH_SIZE = 500;
        //comprobante
        for (let i = 0; i < comprobantesAInsertar.length; i += BATCH_SIZE) {
            const batch = comprobantesAInsertar.slice(i, i + BATCH_SIZE);
            const comprobantesGuardados = await comprobanteRepo.save(batch);
            
            for (let j = 0; j < comprobantesGuardados.length; j++) {
                const index = i + j;
                comprobantesAInsertarReceptor[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
                comprobantesAInsertarEmisor[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
                comprobantesAInsertarComplemento[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
                comprobantesAInsertarConceptos[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
                comprobantesAInsertarImpuestos[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
            }
            
        }
        //receptor  
        for (let i = 0; i < comprobantesAInsertarReceptor.length; i += BATCH_SIZE) {
            const batchreceptor = comprobantesAInsertarReceptor.slice(i, i + BATCH_SIZE);
            const comprobantesGuardadosReceptor = await comprobanteRepoReceptor.save(batchreceptor);
           
        }
        //emisor  
        for (let i = 0; i < comprobantesAInsertarEmisor.length; i += BATCH_SIZE) {
            const batchemisor = comprobantesAInsertarEmisor.slice(i, i + BATCH_SIZE);
            const comprobantesGuardadosEmisor = await comprobanteRepoEmisor.save(batchemisor);
            
        }
        //complemento  
        for (let i = 0; i < comprobantesAInsertarComplemento.length; i += BATCH_SIZE) {
            const batchcomplemento = comprobantesAInsertarComplemento.slice(i, i + BATCH_SIZE);
            const comprobantesGuardadosComplemento = await comprobanteRepoComplemento.save(batchcomplemento);
            
        }
        //conceptos  
        for (let i = 0; i < comprobantesAInsertarConceptos.length; i += BATCH_SIZE) {
            const batchconceptos = comprobantesAInsertarConceptos.slice(i, i + BATCH_SIZE);
            const comprobantesGuardadosConceptos = await comprobanteRepoConceptos.save(batchconceptos);
            
        }
        //impuestos 
        for (let i = 0; i < comprobantesAInsertarImpuestos.length; i += BATCH_SIZE) {
            const batchimpuestos = comprobantesAInsertarImpuestos.slice(i, i + BATCH_SIZE);
            const comprobantesGuardadosImpuestos = await comprobanteRepoImpuestos.save(batchimpuestos);
            
        }
    }
}
