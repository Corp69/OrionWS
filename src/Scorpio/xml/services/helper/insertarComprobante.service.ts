import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { clientHttp } from '@shared/client/clienthttp'; 
import { MailerService } from '@nestjs-modules/mailer';
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
        let response;
        
        let comprobanteRepo = this.dataSource.getRepository(scorpio_xml_comprobante);
        let complementoRepo = this.dataSource.getRepository(scorpio_xml_comprobante_complemento)
        let conceptosRepo = this.dataSource.getRepository(scorpio_xml_comprobante_conceptos)
        let emisorRepo = this.dataSource.getRepository(scorpio_xml_comprobante_emisor)
        let impuestosRepo = this.dataSource.getRepository(scorpio_xml_comprobante_impuestos)
        let receptorRepo = this.dataSource.getRepository(scorpio_xml_comprobante_receptor)
        
        for (let i = 0; i < res.length; i++) {
            response = await this.clientHttp.getXml(res[i]);
            
            for (const comprobante of response){
                try {
                    const comprobantes = comprobanteRepo.create({
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
                    
                    const comprobanteGuardado = await comprobanteRepo.save(comprobantes)
                    console.log( "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" )
                    console.log( comprobanteGuardado.uuid )
                    console.log(  1  )
                    console.log( "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" )
                    
                    const receptor = receptorRepo.create({
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        rfc: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Rfc,
                        nombre: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Nombre,
                        domiciliofiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].DomicilioFiscalReceptor,
                        regimenfiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].RegimenFiscalReceptor,
                        usocfdi: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].UsoCFDI
                    });
                    await receptorRepo.save(receptor)
                    
                    const emisor = emisorRepo.create({
                        uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
                        rfc: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].Rfc,
                        nombre: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].Nombre,
                        regimenfiscal: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].RegimenFiscal
                    });
                    await emisorRepo.save(emisor)
                    
                    const complemento = complementoRepo.create({
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
                    await complementoRepo.save(complemento)
                    
                    const concepto = conceptosRepo.create({
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
                    await conceptosRepo.save(concepto)
                    
                    const impuestos = impuestosRepo.create({
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
                    await impuestosRepo.save(impuestos)
                    
                } catch (error) {
                    
                    if (this.dbErrorHandlerService.handleDBErrors(error)) {
                        console.log(`Este UUID ya existe: ${comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID}`);
                    } else {
                        console.error('Error al guardar comprobante:', error);
                        // Aquí puedes decidir si lanzar el error o solo continuar
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
    }
}
