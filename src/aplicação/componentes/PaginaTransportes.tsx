import { useState } from 'react';
import { Car, Phone, MapPin, Bus, Clock, ExternalLink, Navigation } from 'lucide-react';
import { MenuLateral } from './MenuLateral';

interface PaginaTransportesProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function PaginaTransportes({ aoMudarPagina }: PaginaTransportesProps = {}) {

  const taxis = [
    {
      nome: 'Táxi Central Covilhã',
      telefone: '+351 275 033 033',
      descricao: 'Serviço 24/7',
      disponibilidade: '24h',
    },
    {
      nome: 'Uber',
      descricao: 'Utilize a aplicação Uber, caso não consiga contactar um Táxi',
      disponibilidade: '24h',
    },
  ];

  const linhasAutocarros = [
    {
      linha: '1',
      nome: 'Centro - Campus',
      frequencia: '30 min',
      horario: '07h - 21h',
      cor: 'bg-blue-500',
    },
    {
      linha: '2',
      nome: 'Estação - Campus',
      frequencia: '45 min',
      horario: '07h - 20h',
      cor: 'bg-green-500',
    },
    {
      linha: '3',
      nome: 'Circular Centro',
      frequencia: '20 min',
      horario: '07h - 22h',
      cor: 'bg-red-500',
    },
    {
      linha: '4',
      nome: 'Campus - Hospitais',
      frequencia: '60 min',
      horario: '08h - 19h',
      cor: 'bg-purple-500',
    },
  ];

  return (
    <div>
      {/* Menu Lateral */}
      <MenuLateral aoMudarPagina={aoMudarPagina} />

      <div className="pt-24 px-8 space-y-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-4">
          <div className="bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center">
            <Car size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transportes</h1>
            <p className="text-gray-600">Táxis, autocarros e informações de mobilidade</p>
          </div>
        </div>
      </div>

      {/* Táxis */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Car size={24} />
            Táxis Disponíveis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {taxis.map((taxi, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{taxi.nome}</h3>
                  <p className="text-sm text-gray-600 mb-3">{taxi.descricao}</p>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {taxi.disponibilidade}
                </div>
              </div>

              {taxi.nome === 'Uber' ? (
                <a
                  href="https://www.uber.com/pt/pt-ride/?ad_id=623053405613&adg_id=139915070565&campaign_id=18388851029&cre=623053405613&dev=c&dev_m=&fi_id=&gad_campaignid=18388851029&gad_source=1&gclid=Cj0KCQjw_IXQBhCkARIsADqELbJADTzho-Qmz1xh4MRm37ulgAPXFaXKvSxqQk86MV7fzimtt3i-i_IaArjNEALw_wcB&gclsrc=aw.ds&kw=uber&kwid=kwd-12633382&match=b&net=g&placement=&tar=&utm_campaign=CM2215601-search-google-brand_140_-99_PT-National_r_web_acq_cpc_pt_T2_Generic_BM_uber_kwd-12633382_623053405613_139915070565_b_c&utm_source=AdWords_Brand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                  <ExternalLink size={20} />
                  Ver site
                </a>
              ) : (
                <a
                  href={`tel:${taxi.telefone}`}
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                  <Phone size={20} />
                  {taxi.telefone}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Dicas de segurança */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-6">
          <h3 className="font-bold text-yellow-900 mb-3">⚠️ Dicas de Segurança</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• Partilhe sempre a viagem com táxis legalizados</li>
            <li>• Partilhe a localização com amigos quando andares de táxi à noite</li>
            <li>• Confirma sempre o preço estimado antes de entrar</li>
            <li>• Em grupo, dividir o táxi é mais económico e seguro</li>
          </ul>
        </div>
      </div>

      {/* Autocarros */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bus size={24} />
            Linhas de Autocarros
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {linhasAutocarros.map((linha) => (
            <div key={linha.linha} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className={`${linha.cor} w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
                  {linha.linha}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">{linha.nome}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Frequência: {linha.frequencia}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Horário: {linha.horario}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link para horários */}
        <div className="bg-blue-50 border border-blue-50 rounded-xl p-4 mt-6">
          <div className="flex items-center gap-4">
            <Bus className="text-blue-600 flex-shrink-0" size={32} />
            <div className="flex-1">
              <p className="font-bold text-white text-base mb-3">
                Horários completos e mapas das rotas no site oficial
              </p>
              <a
                href="https://covilhamobilidade.pt/Schedule"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg transition text-sm"
              >
                Aceder ao site do Município
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      
      {/* Informações adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">💡 Dicas de Poupança</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Partilha táxis com colegas para dividir o custo</li>
            <li>• Usa os autocarros municipais quando possível</li>
            <li>• Alguns táxis têm desconto para estudantes</li>
            <li>• Planeia as tuas saídas para apanhar os últimos autocarros</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">📞 Contactos de Emergência</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Emergência: <strong>112</strong></li>
            <li>• PSP Covilhã: <strong>Fax: 275 315 342,</strong> <strong>Telefone: 275 320 920</strong></li>
            <li>• Bombeiros: <strong>275 310 310</strong></li>
            <li>• Hospital: <strong>Fax: 275 330 001,</strong> <strong>Telefone: 275 330 000</strong></li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}
