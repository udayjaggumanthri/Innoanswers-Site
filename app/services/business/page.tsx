import React from "react";
import { serviceDetailsData } from "../../../content/service-details";
import { ServiceDetailPageTemplate } from "../../../components/sections/ServiceDetailPageTemplate";

export const metadata = {
  title: "Business Services — Process & Workflow Automation",
  description:
    "Automate complex back-office workflows, intelligent document processing, insurance intake, and customer support triage with 99%+ accuracy.",
};

export default function BusinessServicesPage() {
  return <ServiceDetailPageTemplate data={serviceDetailsData.business} />;
}
