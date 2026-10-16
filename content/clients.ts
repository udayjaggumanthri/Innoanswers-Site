export interface ClientItem {
  id: string;
  name: string;
  logoSrc?: string;
  placeholder: boolean;
}

export interface ClientsContent {
  eyebrow: string;
  headline: string;
  clients: ClientItem[];
}

export const clientsContent: ClientsContent = {
  eyebrow: "Clients",
  headline: "Trusted by teams that need real answers.",
  clients: [
    { id: "c1", name: "NovaSync", logoSrc: "/images/clients/novasync.svg", placeholder: false },
    { id: "c2", name: "Synthetix", logoSrc: "/images/clients/synthetix.svg", placeholder: false },
    { id: "c3", name: "DataCrest", logoSrc: "/images/clients/datacrest.svg", placeholder: false },
    { id: "c4", name: "AxonFlow", logoSrc: "/images/clients/axonflow.svg", placeholder: false },
    { id: "c5", name: "Aerovance", logoSrc: "/images/clients/aerovance.svg", placeholder: false },
    { id: "c6", name: "Lumina", logoSrc: "/images/clients/lumina.svg", placeholder: false },
  ],
};
