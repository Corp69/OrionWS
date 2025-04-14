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
      const comprobanteRepoEmisor = connection.getRepository(scorpio_xml_comprobante_emisor);
      const comprobanteRepoComplemento = connection.getRepository(scorpio_xml_comprobante_complemento);    
      const comprobanteRepoConceptos = connection.getRepository(scorpio_xml_comprobante_conceptos);    
      const comprobanteRepoImpuestos = connection.getRepository(scorpio_xml_comprobante_impuestos);
      
      const comprobantesAInsertar       = [];
      const comprobantesAInsertarReceptor = [];
      const comprobantesAInsertarEmisor = [];
      const comprobantesAInsertarComplemento = [];
      const comprobantesAInsertarConceptos = [];
      const comprobantesAInsertarImpuestos = [];
      
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
            
            console.log( nuevoComprobanteReceptor );
            console.log( comprobante.data["cfdi:Comprobante"].children.find(c => c["cfdi:Receptor"])?.["cfdi:Receptor"].UsoCFDI );
            
            
            comprobantesAInsertar.push(nuevoComprobante);
            comprobantesAInsertarReceptor.push(nuevoComprobanteReceptor);
            comprobantesAInsertarEmisor.push(nuevoComprobanteEmisor);
            comprobantesAInsertarConceptos.push(nuevoComprobanteConceptos);
            comprobantesAInsertarComplemento.push(nuevoComprobanteComplemento);
            comprobantesAInsertarImpuestos.push(nuevoComprobanteImpuestos);
            
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
        console.log("id del comprobante: ", comprobantesGuardados.map(c => c.id));
      
        for (let j = 0; j < comprobantesGuardados.length; j++) {
          const index = i + j;
          comprobantesAInsertarReceptor[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
          comprobantesAInsertarEmisor[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
          comprobantesAInsertarComplemento[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
          comprobantesAInsertarConceptos[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
          comprobantesAInsertarImpuestos[index].id_scorpio_xml_comprobante = comprobantesGuardados[j].id;
        }

      }
      console.log(comprobantesAInsertarReceptor)
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
      //emisor  
      for (let i = 0; i < comprobantesAInsertarEmisor.length; i += BATCH_SIZE) {
        const batchemisor = comprobantesAInsertarEmisor.slice(i, i + BATCH_SIZE);
        const comprobantesGuardadosEmisor = await comprobanteRepoEmisor.save(batchemisor);
        console.log( ' ==========================================' );
        console.log( comprobantesGuardadosEmisor );
        console.log( comprobantesGuardadosEmisor.toString() );
        console.log( ' ==========================================' );
        
        console.log(`Guardado bloque [${i} - ${i + batchemisor.length - 1}] (${batchemisor.length} receptor):`, comprobantesGuardadosEmisor.map(c => c.uuid));
      }
      //complemento  
      for (let i = 0; i < comprobantesAInsertarComplemento.length; i += BATCH_SIZE) {
        const batchcomplemento = comprobantesAInsertarComplemento.slice(i, i + BATCH_SIZE);
        const comprobantesGuardadosComplemento = await comprobanteRepoComplemento.save(batchcomplemento);
        console.log( ' ==========================================' );
        console.log( comprobantesGuardadosComplemento );
        console.log( comprobantesGuardadosComplemento.toString() );
        console.log( ' ==========================================' );
        
        console.log(`Guardado bloque [${i} - ${i + batchcomplemento.length - 1}] (${batchcomplemento.length} receptor):`, comprobantesGuardadosComplemento.map(c => c.uuid));
      }
      //conceptos  
      for (let i = 0; i < comprobantesAInsertarConceptos.length; i += BATCH_SIZE) {
        const batchconceptos = comprobantesAInsertarConceptos.slice(i, i + BATCH_SIZE);
        const comprobantesGuardadosConceptos = await comprobanteRepoConceptos.save(batchconceptos);
        console.log( ' ==========================================' );
        console.log( comprobantesGuardadosConceptos );
        console.log( comprobantesGuardadosConceptos.toString() );
        console.log( ' ==========================================' );
        
        console.log(`Guardado bloque [${i} - ${i + batchconceptos.length - 1}] (${batchconceptos.length} receptor):`, comprobantesGuardadosConceptos.map(c => c.uuid));
      }
      //impuestos 
      for (let i = 0; i < comprobantesAInsertarImpuestos.length; i += BATCH_SIZE) {
        const batchimpuestos = comprobantesAInsertarImpuestos.slice(i, i + BATCH_SIZE);
        const comprobantesGuardadosImpuestos = await comprobanteRepoImpuestos.save(batchimpuestos);
        console.log( ' ==========================================' );
        console.log( comprobantesGuardadosImpuestos );
        console.log( comprobantesGuardadosImpuestos.toString() );
        console.log( ' ==========================================' );
        
        console.log(`Guardado bloque [${i} - ${i + batchimpuestos.length - 1}] (${batchimpuestos.length} receptor):`, comprobantesGuardadosImpuestos.map(c => c.uuid));
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
