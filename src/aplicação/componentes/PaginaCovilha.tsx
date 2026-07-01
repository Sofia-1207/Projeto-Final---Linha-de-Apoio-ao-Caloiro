import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Star, Building, Coffee, ShoppingBag, Camera, Mountain, Eye, X } from 'lucide-react';
import { MenuLateral } from './MenuLateral';

interface PaginaCovilhaProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function PaginaCovilha({ aoMudarPagina }: PaginaCovilhaProps = {}) {
  const [mostrarPaginaFantasma, setMostrarPaginaFantasma] = useState(false);
  const [pontoSelecionado, setPontoSelecionado] = useState<any>(null);
  
  // Estados para carrosséis pequenos
  const [currentUniversidade, setCurrentUniversidade] = useState(0);
  const [currentInteresse, setCurrentInteresse] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const [currentDiscoteca, setCurrentDiscoteca] = useState(0);
  const [currentVerde, setCurrentVerde] = useState(0);
  
  // Arrays de imagens
  const universidadeImages = [
    '/./Imagens/imagens/faculdade1.jpg',
    '/./Imagens/imagens/faculdade2.jpeg',
    '/./Imagens/imagens/faculdade3.jpeg',
    '/./Imagens/imagens/faculdade4.png',
    '/./Imagens/imagens/faculdade5.jpg',
    '/./Imagens/imagens/faculdade6.jpg'
  ];
  const interesseImages = [
    '/./Imagens/imagens/interesse1.jpg',
    '/./Imagens/imagens/interesse2.jpg',
    '/./Imagens/imagens/interesse3.jpg',
    '/./Imagens/imagens/interesse4.jpg',
    '/./Imagens/imagens/interesse5.jpg',
    '/./Imagens/imagens/interesse6.jpeg',
    '/./Imagens/imagens/interesse7.jpg'
  ];
  const barImages = [
    '/./Imagens/imagens/barcafe1.jpg',
    '/./Imagens/imagens/barcafe2.jpg',
    '/./Imagens/imagens/barcafe3.png',
    '/./Imagens/imagens/barcafe4.jpg',
    '/./Imagens/imagens/barcafe5.jpg',
    '/./Imagens/imagens/barcafe6.webp'
  ];
  const discotecaImages = [
    '/./Imagens/imagens/discoteca1.jpg',
    '/./Imagens/imagens/discoteca2.jpg',
    '/./Imagens/imagens/discoteca3.jpg',
    '/./Imagens/imagens/discoteca4.jpg'
  ];
  const verdeImages = [
    '/./Imagens/imagens/verde1.jpeg',
    '/./Imagens/imagens/verde2.jpeg',
    '/./Imagens/imagens/verde3.jpg'
  ];
  
  // Efeitos para loop automático
  useEffect(() => {
    const intervalUniversidade = setInterval(() => {
      setCurrentUniversidade((prev) => (prev + 1) % universidadeImages.length);
    }, 3000);
    
    const intervalInteresse = setInterval(() => {
      setCurrentInteresse((prev) => (prev + 1) % interesseImages.length);
    }, 3500);
    
    const intervalBar = setInterval(() => {
      setCurrentBar((prev) => (prev + 1) % barImages.length);
    }, 4000);
    
    const intervalDiscoteca = setInterval(() => {
      setCurrentDiscoteca((prev) => (prev + 1) % discotecaImages.length);
    }, 5000);
    
    const intervalVerde = setInterval(() => {
      setCurrentVerde((prev) => (prev + 1) % verdeImages.length);
    }, 5500);
    
    return () => {
      clearInterval(intervalUniversidade);
      clearInterval(intervalInteresse);
      clearInterval(intervalBar);
      clearInterval(intervalDiscoteca);
      clearInterval(intervalVerde);
    };
  }, []);
  
    
  
  // Dados completos dos pontos
  const pontosCompletos = {
    'Faculdade de Ciências': {
      nome: 'Faculdade de Ciências',
      endereco: 'Rua Marquês d\'Ávila e Bolama, 6201-001 Covilhã',
      tipo: 'Pólo I - Universidade',
      descricao: 'Principal instituição de ensino superior da região',
      horario: 'Seg-Sex: 09:00-18:00 | Sábado: Encerrado | Domingo: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/ryVhb5QtqFE8JD2w6',
      detalhes: 'A Faculdade de Ciências da UBI oferece cursos em áreas como Biologia, Química, Física, Matemática e Geociências. Conta com laboratórios modernos e corpo docente qualificado.'
    },
    'Faculdade de Engenharias': {
      nome: 'Faculdade de Engenharias',
      endereco: 'Calçada Fonte do Lameiro 6, 6200-358 Covilhã',
      tipo: 'Pólo I - Universidade',
      descricao: 'Cursos de Engenharia Civil, Informática, Mecânica, Eletrotécnica, Química e Industrial',
      horario: 'Seg-Sex: 08:00-20:30 | Sábado: 08:00-14:00 | Domingo: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/xCWryJsE8vpNZKhq8',
      detalhes: 'A Faculdade de Engenharias é uma das mais prestigiadas de Portugal, com laboratórios de ponta e forte ligação à indústria. Oferece ciclos de estudos em diversas áreas da engenharia.'
    },
    'Faculdade de Ciências Sociais e Humanas': {
      nome: 'Faculdade de Ciências Sociais e Humanas',
      endereco: 'R. José Caetano Júnior 149, 6200-209 Covilhã',
      tipo: 'Pólo IV - Universidade',
      descricao: 'Cursos de Psicologia, Sociologia, Gestão, Economia, Direito e Relações Internacionais',
      horario: 'Seg-Sex: 08:00-20:00 | Sábado: Encerrado | Domingo: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/1pKRpLgAh5DfH69v6',
      detalhes: 'Localizada no Pólo IV, esta faculdade oferece formação em ciências sociais e humanas, com ênfase na investigação e na intervenção social.'
    },
    'Faculdade de Artes e Letras': {
      nome: 'Faculdade de Artes e Letras',
      endereco: 'R. Marquês de Ávila e Bolama, Covilhã',
      tipo: 'Universidade',
      descricao: 'Cursos de Línguas, Literatura, Filosofia, História, Artes Plásticas e Design',
      horario: 'Seg-Sex: 09:00-18:00 | Sábado: Encerrado | Domingo: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/HGso47e1um6vgdHM7',
      detalhes: 'A Faculdade de Artes e Letras promove a criatividade e a cultura, oferecendo cursos que combinam tradição e inovação nas áreas artísticas e humanísticas.'
    },
    'Faculdade de Ciências da Saúde': {
      nome: 'Faculdade de Ciências da Saúde',
      endereco: 'Avenida 25 de Abril, 6200-001 Covilhã',
      tipo: 'Pólo IV - Universidade',
      descricao: 'Cursos na área da saúde com instalações modernas',
      horario: 'Seg-Sex: 09:00-18:00 | Sábado: Encerrado | Domingo: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/8mJqKzVxQpW3r9yY7',
      detalhes: 'A Faculdade de Ciências da Saúde oferece cursos de Medicina, Enfermagem, Farmácia e outras áreas da saúde. Conta com laboratórios avançados e hospital-escola para prática clínica.'
    },
    'Serviços Académicos': {
      nome: 'Serviços Académicos',
      endereco: 'R. Marquês de Ávila e Bolama 44, Covilhã',
      tipo: 'Serviços Administrativos',
      descricao: 'Central de apoio académico para estudantes',
      horario: 'Seg-Sex: 09:00-15:00 | Sábado: 09:00-15:00 | Domingo: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/st1wUhA9AKuGP2ix9',
      detalhes: 'Os Serviços Académicos são o ponto central para suporte administrativo, inscrições, certificados, apoio a bolsas e outros serviços essenciais para a vida académica dos estudantes.'
    },
    'Serra da Estrela': {
      nome: 'Serra da Estrela',
      endereco: 'Acesso pela N339, Covilhã',
      tipo: 'Natureza',
      descricao: 'Montanha mais alta de Portugal Continental',
      horario: 'Acesso 24h',
      mapsUrl: 'https://maps.app.goo.gl/T4wWKK6tsnmBVNKU6',
      detalhes: 'A Serra da Estrela é a montanha mais alta de Portugal Continental, com 1993 metros de altitude. Oferece paisagens deslumbrantes, esqui no inverno e trilhas para caminhadas no verão.'
    },
    'Praça do Município': {
      nome: 'Praça do Município',
      endereco: 'Praça do Município, 6200-001 Covilhã',
      tipo: 'Histórico',
      descricao: 'Centro histórico da cidade',
      horario: 'Acesso livre',
      mapsUrl: 'https://maps.app.goo.gl/FP3ps8b6Y7n1SByt6',
      detalhes: 'O coração histórico da Covilhã, onde se encontra o Paços do Concelho. É o ponto de encontro tradicional da cidade e palco de muitos eventos culturais.'
    },
    'Museu de Lanifícios': {
      nome: 'Museu de Lanifícios',
      endereco: 'Rua dos Lagares da Beira, 6200-001 Covilhã',
      tipo: 'Museu',
      descricao: 'História da indústria têxtil',
      horario: '10:00 - 18:00',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museu+de+Lanif%C3%ADcios+Covilh%C3%A3',
      detalhes: 'O Museu de Lanifícios preserva a história da indústria têxtil que fez a fama da Covilhã. Conta com maquinaria original e exposições interativas.'
    },
    'Serra Shopping': {
      nome: 'Serra Shopping',
      endereco: 'Avenida 25 de Abril, 6200-072 Covilhã',
      tipo: 'Comércio',
      descricao: 'Centro comercial com lojas e serviços',
      horario: 'Domingo: 08:00-22:00\nSegunda-feira: 08:00-23:00\nTerça-feira: 08:00-23:00\nQuarta-feira: 08:00-23:00\nQuinta-feira: 08:00-23:00\nSexta-feira: 08:00-23:00\nSábado: 08:00-23:00',
      mapsUrl: 'https://maps.app.goo.gl/AwTEbKJkdPQKwF7q9',
      detalhes: 'O Serra Shopping é o principal centro comercial da Covilhã, oferecendo uma variedade de lojas, restaurantes, cinema e serviços para toda a família.'
    },
    'Mercado Municipal': {
      nome: 'Mercado Municipal',
      endereco: 'Avenida Dr. Francisco Pires de Carvalho, 6200-001 Covilhã',
      tipo: 'Mercado Local',
      descricao: 'Produtos frescos e artesanato local',
      horario: 'Seg-Sex: 06:00-14:00 | Sábado: 06:00-14:00 | Domingo: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/7X8kZ9vQpW3r9yY7',
      detalhes: 'O Mercado Municipal da Covilhã é um local vibrante onde encontras produtos frescos da região, artesanato local e uma atmosfera autêntica do comércio tradicional. Ideal para descobrir os sabores e produtos da terra.'
    },
    'Portas do Sol': {
      nome: 'Portas do Sol',
      endereco: 'Miradouro das Portas do Sol, Covilhã',
      tipo: 'Miradouro',
      descricao: 'Local de encontros e festas com vista panorâmica para a Covilhã',
      horario: 'Acesso livre 24h',
      mapsUrl: 'https://maps.app.goo.gl/yK5iJvySCJDjNRKA6',
      detalhes: 'As Portas do Sol são um miradouro emblemático da Covilhã, famoso pela sua vista panorâmica espetacular sobre a cidade. É um ponto de encontro popular para festas, celebrações e eventos sociais, especialmente durante as noites de verão. O local oferece uma atmosfera vibrante e é perfeito para apreciar o pôr do sol e as luzes da cidade.'
    },
    'Owl Eye Olho do Mocho (Bordalo II)': {
      nome: 'Owl Eye Olho do Mocho (Bordalo II)',
      endereco: 'Covilhã',
      tipo: 'Miradouro',
      descricao: 'Miradouro natural com vista panorâmica',
      horario: 'Acesso livre',
      mapsUrl: 'https://maps.app.goo.gl/ea7CZGBCrVcTKuH47',
      detalhes: 'O Owl Eye Olho do Mocho (Bordalo II) é um miradouro natural localizado na Serra da Estrela, oferecendo vistas espetaculares da Covilhã e da região. É um ponto turístico importante para quem deseja apreciar a beleza natural da montanha e fotografar paisagens deslumbrantes.'
    },
    'C.C.D. Leões Da Floresta': {
      nome: 'C.C.D. Leões Da Floresta',
      endereco: 'R. António Augusto de Aguiar 16, 6200-050 Covilhã',
      tipo: 'Bar',
      descricao: 'Bar com ambiente acolhedor, boa comida e bastante frequentado por estudantes',
      horario: '12:00 - 02:00',
      mapsUrl: 'https://maps.app.goo.gl/2on9faAryHZrqteP8',
      detalhes: 'Bar tradicional muito popular entre os estudantes da UBI. Oferece petiscos, bebidas e um ambiente descontraído ideal para socializar.'
    },
    'Nata Lisboa': {
      nome: 'Nata Lisboa',
      endereco: 'Covilhã',
      tipo: 'Café',
      descricao: 'Café famoso pelos seus pastéis de nata e ambiente acolhedor',
      horario: 'Sábado: 08:30-02:00 | Domingo: 09:00-01:00 | Seg-Qui: 08:30-01:00 | Sexta: 08:30-02:00',
      mapsUrl: 'https://maps.app.goo.gl/7TPfdAck8VsRjSEv9',
      detalhes: 'O Nata Lisboa é um café encantador que conquistou o coração dos locais e visitantes com seus famosos pastéis de nata. Com um ambiente acolhedor e serviço atencioso, é o local perfeito para um pequeno-almoço, lanche da tarde ou simplesmente para desfrutar de um momento de pausa com um café e um pastel fresco.'
    },
    'Vielas': {
      nome: 'Vielas',
      endereco: 'Covilhã',
      tipo: 'Bar',
      descricao: 'Bar popular para noites animadas e bons momentos e bastante conhecido pelo seu famoso shot "Bochecho"',
      horario: 'Sábado: 22:00-04:00 | Domingo: Encerrado | Segunda: Encerrado | Terça: 22:00-04:00 | Quarta: 22:00-04:00 | Quinta: 22:00-04:00 | Sexta: 22:00-04:00',
      mapsUrl: 'https://maps.app.goo.gl/KY2hyF76T9g88Dnk7',
      detalhes: 'O Vielas é um bar muito popular na Covilhã, conhecido pelas suas noites animadas e ambiente festivo. É o local ideal para quem procura diversão e bons momentos com amigos, especialmente durante os fins de semana. Com música ambiente e um espaço acolhedor, é um dos pontos de encontro preferidos da noite covilhanense.'
    },
    'Bar Académico': {
      nome: 'Bar Académico',
      endereco: 'Covilhã',
      tipo: 'Bar',
      descricao: 'Bar tradicional frequentado por estudantes e académicos',
      horario: 'Segunda: 23:00-04:00 | Terça: 23:00-04:00 | Quarta: FECHADO | Quinta: 23:00-04:00 | Sexta: FECHADO | Sábado: 23:00-04:00 | Domingo: FECHADO',
      mapsUrl: 'https://maps.app.goo.gl/YaYufqmBWWRdb5b97',
      detalhes: 'O Bar Académico é um estabelecimento tradicional da Covilhã, muito popular entre o meio estudantil e académico. Com um ambiente descontraído e acolhedor, é o local perfeito para encontros entre amigos após as aulas. Known for its relaxed atmosphere and affordable prices, it\'s a staple of student night life in the city.'
    },
    'Epicentro': {
      nome: 'Epicentro',
      endereco: 'Covilhã',
      tipo: 'Café',
      descricao: 'Café moderno com pizzas napolitanas e tacos divinais',
      horario: 'Domingo: 19:00-01:00 | Segunda: Encerrado | Terça: 19:00-02:00 | Quarta: 19:00-02:00 | Quinta: 19:00-02:00 | Sexta: 19:00-02:00 | Sábado: 19:00-02:00',
      mapsUrl: 'https://maps.app.goo.gl/5gJPPr1hetJNQTt18',
      detalhes: 'O Epicentro encanta com seu ambiente moderno e acolhedor, perfeito para uma experiência jovial e envolvente. Os clientes elogiam a comida deliciosa e bem apresentada, destacando as pizzas Napolitanas autênticas e os tacos divinais. O serviço é atencioso e simpático, com uma equipe prestativa que garante uma experiência agradável. Preços justos e uma seleção de cocktails maravilhosos completam a visita.'
    },
    'Oriental': {
      nome: 'Oriental',
      endereco: 'Covilhã',
      tipo: 'Bar',
      descricao: 'Bar tradicional com gestão renovada',
      horario: 'Segunda: 13:00-02:00 | Terça: 13:00-02:00 | Quarta: 13:00-02:00 | Quinta: 13:00-02:00 | Sexta: 13:00-02:00 | Sábado: 13:00-02:00 | Domingo: 13:00-02:00',
      mapsUrl: 'https://maps.app.goo.gl/FTwKURWtite7aedn6',
      detalhes: 'Bons velhos tempos do Oriental. Este é o lema desta nova gerência do Bar do Oriental. Trabalhar para todos e colocar o Bar do Oriental no Mapa da Covilhã.'
    },
    'Barô Night Club': {
      nome: 'Barô Night Club',
      endereco: 'Covilhã',
      tipo: 'Discoteca',
      descricao: 'Night club para noites animadas e festas',
      horario: 'Domingo: 00:00-06:00 | Segunda: Encerrado | Terça: 00:00-06:00 | Quarta: 00:00-06:00 | Quinta: 00:00-06:00 | Sexta: 00:00-06:00 | Sábado: 00:00-06:00',
      mapsUrl: 'https://maps.app.goo.gl/HGVV1snQ6F1d3YCj8',
      detalhes: 'O Barô Night Club é um dos principais pontos de noite na Covilhã, conhecido pelas suas festas animadas e ambiente vibrante. Com música atual e espaço amplo, é o local ideal para quem procura diversão até de madrugada. Conta com DJs renomados e uma programação variada durante toda a semana. Siga-nos nas redes sociais para ficar por dentro das novidades e eventos especiais!'
    },
    'Ora Viva': {
      nome: 'Ora Viva',
      endereco: 'Covilhã',
      tipo: 'Bar',
      descricao: 'Bar com funcionamento contínuo nos fins de semana',
      horario: 'Domingo: Aberto 24 horas | Segunda: Aberto 24 horas | Terça: Encerrado | Quarta: Encerrado | Quinta: Encerrado | Sexta: Encerrado | Sábado: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/GPfR4JJkUq1HioFM6',
      detalhes: 'O Ora Viva é um estabelecimento único na Covilhã, com funcionamento especial nos fins de semana. Aberto 24 horas durante domingo e segunda-feira, oferece flexibilidade para os clientes. Durante os restantes dias da semana permanece encerrado. Siga-nos nas redes sociais para manter-se atualizado sobre nosso funcionamento e eventos especiais!'
    },
    'Ex-Libris Club': {
      nome: 'Ex-Libris Club',
      endereco: 'Covilhã',
      tipo: 'Discoteca',
      descricao: 'Night club para as melhores noites na Covilhã',
      horario: 'Domingo: Encerrado | Segunda: Aberto 24 horas | Terça: Aberto 24 horas | Quarta: Aberto 24 horas | Quinta: 00:00-04:00 | Sexta: Aberto 24 horas | Sábado: Encerrado',
      mapsUrl: 'https://maps.app.goo.gl/1idYjeLoUjyyGxev9',
      detalhes: 'As noites da tua vida... na Covilhã! O Ex-Libris Club é o ponto de encontro perfeito para quem procura diversão e boa música. Com ambiente moderno e acolhedor, oferece as melhores festas e eventos da cidade. Siga-nos em #ExLibrisClub para não perder nenhuma novidade e ficar por dentro de tudo que acontece no melhor night club da região!'
    },
    'Companhia Club Covilhã': {
      nome: 'Companhia Club Covilhã',
      endereco: 'Covilhã',
      tipo: 'Discoteca',
      descricao: 'Night club para festas e eventos especiais',
      horario: 'Domingo: 00:00-06:00 | Segunda: Encerrado | Terça: Encerrado | Quarta: Encerrado | Quinta: Encerrado | Sexta: Encerrado | Sábado: 23:59-00:00',
      mapsUrl: 'https://maps.app.goo.gl/sSjQCQNnSroWcVfr5',
      detalhes: 'Ver fotos Companhia Club Covilhã fazendo referencia ao site deles https://www.companhiaclub.com. O Companhia Club Covilhã é um dos night clubs mais exclusivos da cidade, conhecido por suas festas temáticas e eventos memoráveis. Com som de alta qualidade e iluminação espetacular, oferece uma experiência única para os frequentadores. Visite nosso site para conferir a agenda completa e não perder nenhum evento especial!'
    },
    'Jardim Público da Covilha': {
      nome: 'Jardim Público da Covilha',
      endereco: 'Avenida 25 de Abril, 6200-001 Covilhã',
      tipo: 'Jardim',
      descricao: 'Espaço verde central para passeios e relaxamento',
      horario: 'Aberto 24h',
      mapsUrl: 'https://maps.app.goo.gl/xToYcMK9aXBDRKNX6',
      detalhes: 'O Jardim Público da Covilha é o coração verde da cidade, oferecendo um refúgio tranquilo no centro urbano. Com seus caminhos arborizados, bancos para descanso e flora diversificada, é o local perfeito para passeios, leitura ao ar livre e momentos de relaxamento.'
    },
    'Jardim do Lago': {
      nome: 'Jardim do Lago',
      endereco: 'Jardim do Lago, Covilhã',
      tipo: 'Jardim',
      descricao: 'Jardim panorâmico com lago e vista para a cidade',
      horario: 'Aberto 24h',
      mapsUrl: 'https://maps.app.goo.gl/W3Li15fD7EuE9u2x8',
      detalhes: 'O Jardim do Lago é um espaço verde encantador que combina a beleza de um lago sereno com vistas espetaculares para a cidade. Ideal para caminhadas matinais, piqueniques e momentos de contemplação da natureza. O local oferece uma atmosfera pacata e refrescante, perfeita para escapar da agitação urbana.'
    },
    'Jardim do Goldra': {
      nome: 'Jardim do Goldra',
      endereco: 'Jardim do Goldra, Covilhã',
      tipo: 'Jardim',
      descricao: 'Jardim histórico com flora exótica e cascata',
      horario: 'Aberto 24h',
      mapsUrl: 'https://maps.app.goo.gl/oPYBys7FqJPw2HNt6',
      detalhes: 'O Jardim do Goldra é um jardim histórico que encanta pela sua diversidade botânica e beleza natural. Com uma cascata refrescante, espécies exóticas e caminhos sinuosos, oferece um ambiente mágico para passeios tranquilos. É um local privilegiado para fotografia e contemplação da natureza em seu estado mais puro.'
    }
  };

  const handleVerPonto = (nomePonto: string) => {
    const ponto = pontosCompletos[nomePonto as keyof typeof pontosCompletos];
    if (ponto) {
      setPontoSelecionado(ponto);
      setMostrarPaginaFantasma(true);
    }
  };

  const fecharPaginaFantasma = () => {
    setMostrarPaginaFantasma(false);
    setPontoSelecionado(null);
  };

  // Função para determinar cor e ícone da categoria
  const getCategoriaInfo = (nome: string, tipo?: string) => {
    const searchText = `${nome} ${tipo || ''}`;
    if (searchText.includes('Faculdade') || searchText.includes('Departamento')) {
      return { cor: 'bg-blue-50 border border-blue-50', corIcone: 'bg-blue-600', icone: Building };
    } else if (searchText.includes('Serra') || searchText.includes('Praça') || searchText.includes('Museu') || searchText.includes('Mercado')) {
      return { cor: 'from-purple-500 to-purple-600', corIcone: 'bg-purple-500', icone: Camera };
    } else if (searchText.includes('Discoteca')) {
      return { cor: 'bg-pink-500', corIcone: 'bg-pink-500', icone: Star };
    } else if (searchText.includes('C.C.D.') || searchText.includes('Café')) {
      return { cor: 'bg-green-500', corIcone: 'bg-green-500', icone: Coffee };
    } else if (searchText.includes('Bar')) {
      return { cor: 'bg-green-500', corIcone: 'bg-green-500', icone: Coffee };
    } else if (searchText.includes('Restaurante')) {
      return { cor: 'bg-pink-500', corIcone: 'bg-pink-500', icone: Star };
    } else if (searchText.includes('Parque') || searchText.includes('Jardim')) {
      return { cor: 'from-emerald-500 to-emerald-600', corIcone: 'bg-emerald-500', icone: Mountain };
    } else {
      return { cor: 'from-orange-500 to-orange-600', corIcone: 'bg-orange-500', icone: MapPin };
    }
  };


  return (
    <div>
      {/* Menu Lateral */}
      <MenuLateral aoMudarPagina={aoMudarPagina} />

      <div className="pt-24 px-8 space-y-8 min-h-screen bg-gray-50 pb-16">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center">
              <MapPin size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Descobre a Covilhã</h1>
              <p className="text-gray-600">A cidade da lã e portão de entrada para a Serra da Estrela</p>
            </div>
          </div>
        </div>

        {/* Sobre a Covilhã */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sobre a Covilhã</h2>
          <div className="prose prose-gray max-w-none text-center">
            <p className="texxt-gray-700 leading-relaxed mb-4">
              A Covilhã, conhecida como "Cidade da Lã", é uma cidade histórica localizada no coração de Portugal, 
              aos pés da majestosa Serra da Estrela. Com uma rica herança industrial e uma vibrante vida universitária, 
              a cidade oferece o equilíbrio perfeito entre tradição e modernidade.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fundada no século XII, a Covilhã foi um importante centro da indústria lanífera portuguesa, 
              sendo hoje uma cidade dinâmica que acolhe estudantes de todo o mundo na sua prestigiada 
              Universidade da Beira Interior.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Com acesso privilegiado à Serra da Estrela, a cidade é o ponto de partida ideal para 
              explorar as maravilhas naturais da montanha mais alta de Portugal Continental, 
              enquanto desfruta do charme e da hospitalidade das suas ruas históricas.
            </p>
          </div>
        </div>

        {/* Categorias de Locais */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin size={24} />
            Explora a Covilhã
          </h2>

          {/* Faculdades */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Categoria */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Building size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Faculdades</h3>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Faculdade de Ciências</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Faculdade de Ciências')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Faculdade de Engenharias</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Faculdade de Engenharias')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Faculdade de Ciências Sociais e Humanas</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Faculdade de Ciências Sociais e Humanas')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Faculdade de Artes e Letras</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Faculdade de Artes e Letras')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Faculdade de Ciências da Saúde</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Faculdade de Ciências da Saúde')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Serviços Académicos</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Serviços Académicos')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrossel Faculdades */}
              <div className="min-w-0">
                <div className="relative w-full h-80 rounded-lg overflow-hidden">
                  <div className="flex h-full transition-transform duration-500 ease-in-out" 
                       style={{ transform: `translateX(-${currentUniversidade * 100}%)` }}>
                    {universidadeImages.map((image, index) => (
                      <div key={index} className="relative min-w-full w-full flex-shrink-0 h-full">
                        <img 
                          src={image} 
                          alt={`Universidade ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pontos de Interesse */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Categoria */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Camera size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Pontos de Interesse</h3>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Serra da Estrela</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Serra da Estrela')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Praça do Município</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Praça do Município')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Museu de Lanifícios</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Museu de Lanifícios')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Serra Shopping</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Serra Shopping')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Mercado Municipal</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Mercado Municipal')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Portas do Sol</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Portas do Sol')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Owl Eye Olho do Mocho (Bordalo II)</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Owl Eye Olho do Mocho (Bordalo II)')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrossel Pontos de Interesse */}
              <div className="min-w-0">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <div className="flex h-full transition-transform duration-500 ease-in-out" 
                       style={{ transform: `translateX(-${currentInteresse * 100}%)` }}>
                    {interesseImages.map((image, index) => (
                      <div key={index} className="relative min-w-full w-full flex-shrink-0 h-full">
                        <img 
                          src={image} 
                          alt={`Ponto de Interesse ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bares e Cafés */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Categoria */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Coffee size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Bares e Cafés</h3>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">C.C.D. Leões Da Floresta</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('C.C.D. Leões Da Floresta')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Nata Lisboa</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Nata Lisboa')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Vielas</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Vielas')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Bar Académico</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Bar Académico')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Oriental</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Oriental')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Ora Viva</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Ora Viva')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Epicentro</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Epicentro')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrossel Bares e Cafés */}
              <div className="min-w-0">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <div className="flex h-full transition-transform duration-500 ease-in-out" 
                       style={{ transform: `translateX(-${currentBar * 100}%)` }}>
                    {barImages.map((image, index) => (
                      <div key={index} className="relative min-w-full w-full flex-shrink-0 h-full">
                        <img 
                          src={image} 
                          alt={`Bar ou Café ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discotecas */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Categoria */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-pink-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Star size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Discotecas</h3>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-pink-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Barô Night Club</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Barô Night Club')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Ex-Libris Club</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Ex-Libris Club')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Companhia Club Covilhã</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Companhia Club Covilhã')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrossel Discotecas */}
              <div className="min-w-0">
                <div className="relative w-full h-80 rounded-lg overflow-hidden">
                  <div className="flex h-full transition-transform duration-500 ease-in-out" 
                       style={{ transform: `translateX(-${currentDiscoteca * 100}%)` }}>
                    {discotecaImages.map((image, index) => (
                      <div key={index} className="relative min-w-full w-full flex-shrink-0 h-full">
                        <img 
                          src={image} 
                          alt={`Discoteca ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Espaços Verdes */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Categoria */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Mountain size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Espaços Verdes</h3>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Jardim Público da Covilha</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Jardim Público da Covilha')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Jardim do Lago</h4>
                      </div>
                      <button 
                        onClick={() => handleVerPonto('Jardim do Lago')}
                        className="border border-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrossel Espaços Verdes */}
              <div className="min-w-0">
                <div className="relative w-full h-80 rounded-lg overflow-hidden">
                  <div className="flex h-full transition-transform duration-500 ease-in-out" 
                       style={{ transform: `translateX(-${currentVerde * 100}%)` }}>
                    {verdeImages.map((image, index) => (
                      <div key={index} className="relative min-w-full w-full flex-shrink-0 h-full">
                        <img 
                          src={image} 
                          alt={`Espaço Verde ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dicas para Visitar a Covilhã */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 mx-8">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-blue-600" />
          Dicas para Visitar a Covilhã
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Melhor Altura para Visitar</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Primavera e Outono: Clima ameno ideal</li>
              <li>✓ Inverno: Acesso à Serra da Estrela para neve</li>
              <li>✓ Verão: Eventos culturais e festivais</li>
              <li>✓ Ano todo: Património histórico e gastronomia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">O Que Não Perder</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Visita ao Museu de Lanifícios</li>
              <li>✓ Passeio pela Serra da Estrela</li>
              <li>✓ Provar os tradicionais bolos de Festa</li>
              <li>✓ Explorar o centro histórico</li>
            </ul>
          </div>
        </div>
              </div>

      {/* Página Fantasma - Detalhes do Ponto */}
      {mostrarPaginaFantasma && pontoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            {(() => {
              const categoriaInfo = getCategoriaInfo(pontoSelecionado.nome, pontoSelecionado.tipo);
              const IconeComponent = categoriaInfo.icone;
              const isFaculdade = categoriaInfo.cor.includes('bg-blue-50');
              const isGradient = categoriaInfo.cor.includes('from-');
              return (
                <div className={`${isFaculdade ? categoriaInfo.cor : isGradient ? `bg-gradient-to-r ${categoriaInfo.cor}` : categoriaInfo.cor} p-6 rounded-t-2xl`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${categoriaInfo.corIcone} w-12 h-12 rounded-lg flex items-center justify-center`}>
                        <IconeComponent size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${isFaculdade ? 'text-white' : 'text-white'}`}>{pontoSelecionado.nome}</h2>
                        <p className={`${isFaculdade ? 'text-white' : 'text-white text-opacity-90'}`}>{pontoSelecionado.tipo}</p>
                      </div>
                    </div>
                    <button
                      onClick={fecharPaginaFantasma}
                      className="relative text-white bg-transparent border-none p-2 cursor-pointer group focus:outline-none focus:ring-0"
                    >
                      <div className="absolute inset-0 bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <X size={20} className={`relative z-10 transition-colors duration-200 ${
                        pontoSelecionado.tipo?.includes('Faculdade') || pontoSelecionado.tipo?.includes('Universidade') || pontoSelecionado.tipo?.includes('Serviços') ? 'group-hover:text-blue-800' :
                        pontoSelecionado.tipo?.includes('Bar') || pontoSelecionado.tipo?.includes('Café') ? 'group-hover:text-green-500' :
                        pontoSelecionado.tipo?.includes('Discoteca') ? 'group-hover:text-pink-500' :
                        pontoSelecionado.tipo?.includes('Natureza') || pontoSelecionado.tipo?.includes('Histórico') || pontoSelecionado.tipo?.includes('Museu') || pontoSelecionado.tipo?.includes('Mercado') || pontoSelecionado.tipo?.includes('Miradouro') ? 'group-hover:text-purple-500' :
                        pontoSelecionado.tipo?.includes('Jardim') ? 'group-hover:text-emerald-500' :
                        'group-hover:text-orange-500'
                      }`} />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Conteúdo Detalhado */}
            <div className="p-6 space-y-6">
              {/* Informações Básicas */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informações</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const categoriaInfo = getCategoriaInfo(pontoSelecionado.nome, pontoSelecionado.tipo);
                      const IconeComponent = categoriaInfo.icone;
                      return <MapPin size={18} className={categoriaInfo.corIcone.replace('bg-', 'text-')} />;
                    })()}
                    <span className="text-gray-700">{pontoSelecionado.endereco}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {(() => {
                      const categoriaInfo = getCategoriaInfo(pontoSelecionado.nome, pontoSelecionado.tipo);
                      return <Clock size={18} className={categoriaInfo.corIcone.replace('bg-', 'text-')} />;
                    })()}
                    <span className="text-gray-700">{pontoSelecionado.horario}</span>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">{pontoSelecionado.descricao}</p>
              </div>

              {/* Detalhes Adicionais */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detalhes</h3>
                <p className="text-gray-700 leading-relaxed">{pontoSelecionado.detalhes}</p>
              </div>

              {/* Ações */}
              <div className="flex gap-4">
                {(() => {
                  const categoriaInfo = getCategoriaInfo(pontoSelecionado.nome, pontoSelecionado.tipo);
                  const isFaculdade = categoriaInfo.cor.includes('bg-blue-50');
                  const isGradient = categoriaInfo.cor.includes('from-');
                  return (
                    <a 
                      href={pontoSelecionado.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${isFaculdade ? categoriaInfo.cor + ' text-white' : isGradient ? `bg-gradient-to-r ${categoriaInfo.cor} text-white` : categoriaInfo.cor + ' text-white'} font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2`}
                    >
                      <Navigation size={20} />
                      Ver no Google Maps
                    </a>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
