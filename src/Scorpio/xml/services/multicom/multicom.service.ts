import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { ResponseDto } from '@shared/dtos/Response.dto';
//entidades
import { xml_comprobante_solicita_metada } from '../../../controlapp/entities/solicitudes/xml_comprobante_solicita_metada.entity';
import { scorpio_xml_comprobante } from '../../entities/comprobantes/scorpio_xml_comprobante.entity';
import { scorpio_xml_comprobante_complemento } from '../../entities/comprobantes/scorpio_xml_comprobante_complemento.entity';
import { scorpio_xml_comprobante_conceptos } from '../../entities/comprobantes/scorpio_xml_comprobante_conceptos.entity';
import { scorpio_xml_comprobante_emisor } from '../../entities/comprobantes/scorpio_xml_comprobante_emisor.entity';
import { scorpio_xml_comprobante_impuestos } from '../../entities/comprobantes/scorpio_xml_comprobante_impuestos.entity';
import { scorpio_xml_comprobante_receptor } from '../../entities/comprobantes/scorpio_xml_comprobante_receptor.entity';

//manejo de errores
import { DBErrorHandlerService } from '@shared/errors/DBErrorHandlerService';

//dtos
import { 
  MultiSolicitaDto,
  MultiVerificaDto
} from '../../dtos/multicomp';

//Cliente http
import { clientHttp } from '@shared/client/clienthttp';





@Injectable()
export class MulticomService {
  
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
    private readonly http: clientHttp,
    private readonly dbErrorHandlerService: DBErrorHandlerService
  ) {}
  //Solicitar multicomprobantes
  public async XML_MultComprobante_Solicitar(clientId: number,  id: number): Promise<ResponseDto<any>> {
    try {
      // 
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      
      // entity
      const repository = connection.getRepository(xml_comprobante_solicita_metada);
      
      //Funcion
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_generar_solicitud_multicomprobante(${id});`);
      //construccion de XML - generar solicitud
      const Solicita: MultiSolicitaDto = new MultiSolicitaDto(
        
        data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[0].valor,
        data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[4].valor,
        data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[1].valor,
        data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.fechainicio,
        data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.fechafin,
        [data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.rfc],
        data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.tipopeticion,
        data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.tipocomprobante,
        data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.montominimo,
        data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.montomaximo      
      );
      //peticion con axios
      const response = await this.http.httpPost(data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[3].valor, Solicita);
      
      
      if(response.codigo !== 0){
        return {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Multicomprobantes Solicitar',
          Mensaje: 'Operación no se realizó',
          Response: response,
        };
      }
      
      
      //actualizo el estatus de la peticion.
      await repository.update(id, {
        id_estatus: 7,
        id_xml_peticion: response.solicitud,
      });
      
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Multicomprobantes Solicitar',
        Mensaje: 'Operación Realizada con exito.',
        Response: response,
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Comprobante',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  //Verificar solicitud de multicomprobantes
  public async XML_MultComprobante_Verificar( clientId: number,  id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      
      //Funcion
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_verifica(${id});`);
      // construccion de XML - create social
      const Body: MultiVerificaDto = new MultiVerificaDto(
        data[0].sp_build_xml_verifica.XML[0].valor,
        data[0].sp_build_xml_verifica.XML[7].valor,
        data[0].sp_build_xml_verifica.XML[1].valor,
        data[0].sp_build_xml_verifica.solicitud.valor
      );
      
      //peticion con axios
      const response = await this.http.httpPost(data[0].sp_build_xml_verifica.XML[6].valor, Body );
      
      if(response.codigo || response.codigo !== 0){
        return {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Multicomprobante Verificar',
          Mensaje: 'Operación no se realizó',
          Response: response,
        };
      }
      
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Multicomprobantes Verificar',
        Mensaje: 'Operación Realizada con exito.',
        Response: response,
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Multicomprobantes Verificar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  //Verificar solicitud de multicomprobantes
  public async XML_MultComprobante_Verificar_XML_JSON( clientId: number,  id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      
      //Funcion
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_verifica(${id});`);
      // construccion de XML - create social
      const Body: MultiVerificaDto = new MultiVerificaDto(
        data[0].sp_build_xml_verifica.XML[0].valor,
        data[0].sp_build_xml_verifica.XML[7].valor,
        data[0].sp_build_xml_verifica.XML[1].valor,
        data[0].sp_build_xml_verifica.solicitud.valor
      );
      
      //peticion con axios
      const res = await this.http.httpPost(data[0].sp_build_xml_verifica.XML[6].valor, Body );
      
      if(res.codigo !== 0){
        return {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Multicomprobante Verificar',
          Mensaje: 'Operación no se realizó',
          Response: res,
        };
      }
      
      console.log(res.respuesta)
      
      //peticion con axios
      let response;
      // console.log(JSON.stringify(response))
      
      let comprobanteRepo = connection.getRepository(scorpio_xml_comprobante);
      let complementoRepo = connection.getRepository(scorpio_xml_comprobante_complemento)
      let conceptosRepo = connection.getRepository(scorpio_xml_comprobante_conceptos)
      let emisorRepo = connection.getRepository(scorpio_xml_comprobante_emisor)
      let impuestosRepo = connection.getRepository(scorpio_xml_comprobante_impuestos)
      let receptorRepo = connection.getRepository(scorpio_xml_comprobante_receptor)
      
      for (let i = 0; i < res.respuesta.length; i++) {
        response = await this.http.getXml(res.respuesta[i]);
        
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
            
            const receptor = receptorRepo.create({
              id_scorpio_xml_comprobante: comprobanteGuardado.id,
              rfc: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Rfc,
              nombre: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Nombre,
              domiciliofiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].DomicilioFiscalReceptor,
              regimenfiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].RegimenFiscalReceptor,
              usocfdi: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].UsoCFDI
            });
            await receptorRepo.save(receptor)
            
            const emisor = emisorRepo.create({
              id_scorpio_xml_comprobante: comprobanteGuardado.id,
              rfc: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].Rfc,
              nombre: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].Nombre,
              regimenfiscal: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Emisor"])?.["cfdi:Emisor"].RegimenFiscal
            });
            await emisorRepo.save(emisor)
            
            const complemento = complementoRepo.create({
              id_scorpio_xml_comprobante: comprobanteGuardado.id,
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
              id_scorpio_xml_comprobante: comprobanteGuardado.id,
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
              id_scorpio_xml_comprobante: comprobanteGuardado.id,
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

      
      

      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Multicomprobantes Verificar',
        Mensaje: 'Operación Realizada con exito.',
        Response: response,
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
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
