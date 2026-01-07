export interface City {
  name: string;
  code: string;
}

export interface State {
  name: string;
  code: string;
  cities: City[];
}

export const brazilStates: State[] = [
  {
    name: "Acre",
    code: "AC",
    cities: [
      { name: "Rio Branco", code: "rio-branco" },
      { name: "Cruzeiro do Sul", code: "cruzeiro-do-sul" },
      { name: "Sena Madureira", code: "sena-madureira" },
    ],
  },
  {
    name: "Alagoas",
    code: "AL",
    cities: [
      { name: "Maceió", code: "maceio" },
      { name: "Arapiraca", code: "arapiraca" },
      { name: "Palmeira dos Índios", code: "palmeira-dos-indios" },
    ],
  },
  {
    name: "Amapá",
    code: "AP",
    cities: [
      { name: "Macapá", code: "macapa" },
      { name: "Santana", code: "santana" },
      { name: "Laranjal do Jari", code: "laranjal-do-jari" },
    ],
  },
  {
    name: "Amazonas",
    code: "AM",
    cities: [
      { name: "Manaus", code: "manaus" },
      { name: "Parintins", code: "parintins" },
      { name: "Itacoatiara", code: "itacoatiara" },
    ],
  },
  {
    name: "Bahia",
    code: "BA",
    cities: [
      { name: "Salvador", code: "salvador" },
      { name: "Feira de Santana", code: "feira-de-santana" },
      { name: "Vitória da Conquista", code: "vitoria-da-conquista" },
      { name: "Camaçari", code: "camacari" },
      { name: "Juazeiro", code: "juazeiro" },
      { name: "Iquexique", code: "iquexique" },
    ],
  },
  {
    name: "Ceará",
    code: "CE",
    cities: [
      { name: "Fortaleza", code: "fortaleza" },
      { name: "Caucaia", code: "caucaia" },
      { name: "Juazeiro do Norte", code: "juazeiro-do-norte" },
    ],
  },
  {
    name: "Distrito Federal",
    code: "DF",
    cities: [
      { name: "Brasília", code: "brasilia" },
      { name: "Taguatinga", code: "taguatinga" },
      { name: "Ceilândia", code: "ceilandia" },
    ],
  },
  {
    name: "Espírito Santo",
    code: "ES",
    cities: [
      { name: "Vitória", code: "vitoria" },
      { name: "Vila Velha", code: "vila-velha" },
      { name: "Cariacica", code: "cariacica" },
    ],
  },
  {
    name: "Goiás",
    code: "GO",
    cities: [
      { name: "Goiânia", code: "goiania" },
      { name: "Aparecida de Goiânia", code: "aparecida-de-goiania" },
      { name: "Anápolis", code: "anapolis" },
    ],
  },
  {
    name: "Maranhão",
    code: "MA",
    cities: [
      { name: "São Luís", code: "sao-luis" },
      { name: "Imperatriz", code: "imperatriz" },
      { name: "Caxias", code: "caxias" },
    ],
  },
  {
    name: "Mato Grosso",
    code: "MT",
    cities: [
      { name: "Cuiabá", code: "cuiaba" },
      { name: "Várzea Grande", code: "varzea-grande" },
      { name: "Rondonópolis", code: "rondonopolis" },
    ],
  },
  {
    name: "Mato Grosso do Sul",
    code: "MS",
    cities: [
      { name: "Campo Grande", code: "campo-grande" },
      { name: "Dourados", code: "dourados" },
      { name: "Três Lagoas", code: "tres-lagoas" },
    ],
  },
  {
    name: "Minas Gerais",
    code: "MG",
    cities: [
      { name: "Belo Horizonte", code: "belo-horizonte" },
      { name: "Uberlândia", code: "uberlandia" },
      { name: "Contagem", code: "contagem" },
    ],
  },
  {
    name: "Pará",
    code: "PA",
    cities: [
      { name: "Belém", code: "belem" },
      { name: "Ananindeua", code: "ananindeua" },
      { name: "Marabá", code: "maraba" },
    ],
  },
  {
    name: "Paraíba",
    code: "PB",
    cities: [
      { name: "João Pessoa", code: "joao-pessoa" },
      { name: "Campina Grande", code: "campina-grande" },
      { name: "Santa Rita", code: "santa-rita" },
    ],
  },
  {
    name: "Paraná",
    code: "PR",
    cities: [
      { name: "Curitiba", code: "curitiba" },
      { name: "Londrina", code: "londrina" },
      { name: "Maringá", code: "maringa" },
    ],
  },
  {
    name: "Pernambuco",
    code: "PE",
    cities: [
      { name: "Recife", code: "recife" },
      { name: "Jaboatão dos Guararapes", code: "jaboatao-dos-guararapes" },
      { name: "Olinda", code: "olinda" },
    ],
  },
  {
    name: "Piauí",
    code: "PI",
    cities: [
      { name: "Teresina", code: "teresina" },
      { name: "Parnaíba", code: "parnaiba" },
      { name: "Picos", code: "picos" },
    ],
  },
  {
    name: "Rio de Janeiro",
    code: "RJ",
    cities: [
      { name: "Rio de Janeiro", code: "rio-de-janeiro" },
      { name: "São Gonçalo", code: "sao-goncalo" },
      { name: "Duque de Caxias", code: "duque-de-caxias" },
    ],
  },
  {
    name: "Rio Grande do Norte",
    code: "RN",
    cities: [
      { name: "Natal", code: "natal" },
      { name: "Mossoró", code: "mossoro" },
      { name: "Parnamirim", code: "parnamirim" },
    ],
  },
  {
    name: "Rio Grande do Sul",
    code: "RS",
    cities: [
      { name: "Porto Alegre", code: "porto-alegre" },
      { name: "Caxias do Sul", code: "caxias-do-sul" },
      { name: "Pelotas", code: "pelotas" },
    ],
  },
  {
    name: "Rondônia",
    code: "RO",
    cities: [
      { name: "Porto Velho", code: "porto-velho" },
      { name: "Ji-Paraná", code: "ji-parana" },
      { name: "Ariquemes", code: "ariquemes" },
    ],
  },
  {
    name: "Roraima",
    code: "RR",
    cities: [
      { name: "Boa Vista", code: "boa-vista" },
      { name: "Rorainópolis", code: "rorainopolis" },
      { name: "Caracaraí", code: "caracarai" },
    ],
  },
  {
    name: "Santa Catarina",
    code: "SC",
    cities: [
      { name: "Florianópolis", code: "florianopolis" },
      { name: "Joinville", code: "joinville" },
      { name: "Blumenau", code: "blumenau" },
    ],
  },
  {
    name: "São Paulo",
    code: "SP",
    cities: [
      { name: "São Paulo", code: "sao-paulo" },
      { name: "Guarulhos", code: "guarulhos" },
      { name: "Campinas", code: "campinas" },
    ],
  },
  {
    name: "Sergipe",
    code: "SE",
    cities: [
      { name: "Aracaju", code: "aracaju" },
      { name: "Nossa Senhora do Socorro", code: "nossa-senhora-do-socorro" },
      { name: "Lagarto", code: "lagarto" },
    ],
  },
  {
    name: "Tocantins",
    code: "TO",
    cities: [
      { name: "Palmas", code: "palmas" },
      { name: "Araguaína", code: "araguaina" },
      { name: "Gurupi", code: "gurupi" },
    ],
  },
];

export function getCitiesByState(stateCode: string): City[] {
  const state = brazilStates.find((s) => s.code === stateCode);
  return state?.cities || [];
}

export function getStateByCode(stateCode: string): State | undefined {
  return brazilStates.find((s) => s.code === stateCode);
}
