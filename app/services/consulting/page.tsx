import React from "react";
import { serviceDetailsData } from "../../../content/service-details";
import { ServiceDetailPageTemplate } from "../../../components/sections/ServiceDetailPageTemplate";

export const metadata = {
  title: "AI Consulting — Feasibility Audits, Strategy & Governance",
  description:
    "Unbiased technical advisory, data-readiness audits, vendor benchmarks, and EU AI Act / HIPAA compliance governance roadmaps.",
};

export default function ConsultingServicesPage() {
  return <ServiceDetailPageTemplate data={serviceDetailsData.consulting} />;
}
