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
  public async XML_MultComprobante_Verificar_XML_JSON(clientId: number, id: number): Promise<ResponseDto<any>> {
    try {
      const connection = await this.dbConnectionService.getConnection(clientId);
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_verifica(${id});`);
      
      const Body: MultiVerificaDto = new MultiVerificaDto(
        data[0].sp_build_xml_verifica.XML[0].valor,
        data[0].sp_build_xml_verifica.XML[7].valor,
        data[0].sp_build_xml_verifica.XML[1].valor,
        data[0].sp_build_xml_verifica.solicitud.valor
      );
      
      const res = await this.http.httpPost(data[0].sp_build_xml_verifica.XML[6].valor, Body);
      
      if (res.codigo !== 0) {
        return {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Multicomprobante Verificar',
          Mensaje: 'Operación no se realizó',
          Response: res,
        };
      }
      
      console.log("URLs recibidas:", res.respuesta);
      
      const comprobanteRepo = connection.getRepository(scorpio_xml_comprobante);
      const comprobanteRepoReceptor = connection.getRepository(scorpio_xml_comprobante_receptor);
      const comprobantesAInsertar       = [];
      const comprobantesAInsertarReceptor = [];
      
      // Obtener todos los XMLs en paralelo
      const xmlResponses = await Promise.all(
        res.respuesta.map(url => this.http.getXml(url).catch(error => ({ error, url })))
      );
      
      for (const response of xmlResponses) {
        // Si hubo error con alguna URL, se omite y se loguea
        if (response.error) {
          console.error(`Error al obtener XML desde ${response.url}:`, response.error.message);
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
              uuid: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID,
              rfc: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Rfc,
              nombre: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].Nombre,
              domiciliofiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].DomicilioFiscalReceptor,
              regimenfiscalreceptor: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].RegimenFiscalReceptor,
              usocfdi: comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].UsoCFDI
            });

            console.log( nuevoComprobanteReceptor );
            console.log( comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].UsoCFDI );
            
            
            comprobantesAInsertar.push(nuevoComprobante);
            comprobantesAInsertarReceptor.push(nuevoComprobanteReceptor);

            console.log( comprobantesAInsertarReceptor.toString() );
            
            
          } catch (error) {
            const uuid = comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Complemento"])?.["cfdi:Complemento"].children.find(c => c["tfd:TimbreFiscalDigital"])?.["tfd:TimbreFiscalDigital"].UUID;
            if (this.dbErrorHandlerService.handleDBErrors(error)) {
              console.log(`Este UUID ya existe: ${uuid}`);
            } else {
              console.error('Error al guardar comprobante:', error);
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
      
      
      
      console.log( 'arreglo de inserts    ---> '  + comprobantesAInsertar );
      console.log(  comprobantesAInsertarReceptor.toString );
 
      // Inserción en bloques de 20000
      const BATCH_SIZE = 500;
      //comprobante
      for (let i = 0; i < comprobantesAInsertar.length; i += BATCH_SIZE) {
        const batch = comprobantesAInsertar.slice(i, i + BATCH_SIZE);
        const comprobantesGuardados = await comprobanteRepo.save(batch);
        console.log(`Guardado bloque [${i} - ${i + batch.length - 1}] (${batch.length} comprobantes):`, comprobantesGuardados.map(c => c.uuid));
      }
      //receptor  
      for (let i = 0; i < comprobantesAInsertarReceptor.length; i += BATCH_SIZE) {
        const batchreceptor = comprobantesAInsertarReceptor.slice(i, i + BATCH_SIZE);
        const comprobantesGuardadosReceptor = await comprobanteRepoReceptor.save(batchreceptor);
         console.log( ' ==========================================' );
         console.log( comprobantesGuardadosReceptor );
         console.log( comprobantesGuardadosReceptor.toString() );
         console.log( ' ==========================================' );
         
        console.log(`Guardado bloque [${i} - ${i + batchreceptor.length - 1}] (${batchreceptor.length} receptor):`, comprobantesGuardadosReceptor.map(c => c.uuid));
      }
      
      //otros 
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Multicomprobantes Verificar',
        Mensaje: 'Operación Realizada con éxito.',
        Response: res.respuesta,
      };
      
    } catch (error) {
      //aqui esta 
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Multicomprobantes Verificar',
          Mensaje: 'Operación no se realizó',
          Response: 'Syncronizacion correcta. !',
        },
        HttpStatus.OK,
      );
    }
  }
  
  
  
  
  
  
  
}
