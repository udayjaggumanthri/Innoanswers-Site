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
  eyebrow: "Clients & Partners",
  headline: "Trusted by forward-thinking teams across industries.",
  clients: [
    { id: "c1", name: "Tata Motors SA", logoSrc: "/images/clients/tatamotorssa.png", placeholder: false },
    { id: "c2", name: "Navanaami", logoSrc: "/images/clients/navanaami.png", placeholder: false },
    { id: "c3", name: "Prism Tech Soft", logoSrc: "/images/clients/prismtechsoft.png", placeholder: false },
    { id: "c4", name: "Techzert", logoSrc: "/images/clients/techzert.png", placeholder: false },
    { id: "c5", name: "Pinpicker", logoSrc: "/images/clients/pinpicker.png", placeholder: false },
    { id: "c6", name: "Peroneira", logoSrc: "/images/clients/peroneira.png", placeholder: false },
    { id: "c7", name: "Elokers", logoSrc: "/images/clients/elokers.png", placeholder: false },
    { id: "c8", name: "Masti Tickets", logoSrc: "/images/clients/mastitickets.png", placeholder: false },
    { id: "c9", name: "Sri Anjana", logoSrc: "/images/clients/srianjana.png", placeholder: false },
    { id: "c10", name: "SSV Estates", logoSrc: "/images/clients/ssvestates.png", placeholder: false },
    { id: "c11", name: "The Lawnz", logoSrc: "/images/clients/thelawnz.png", placeholder: false },
    { id: "c12", name: "Fairy Frills", logoSrc: "/images/clients/fairyfrills.jpg", placeholder: false },
  ],
};
