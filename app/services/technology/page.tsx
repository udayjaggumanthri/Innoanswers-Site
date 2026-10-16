import React from "react";
import { serviceDetailsData } from "../../../content/service-details";
import { ServiceDetailPageTemplate } from "../../../components/sections/ServiceDetailPageTemplate";

export const metadata = {
  title: "Technology Services — Custom AI & Machine Learning Engineering",
  description:
    "Engineering-grade AI applications, custom predictive models, enterprise RAG, and high-throughput data infrastructure deployed directly in your private cloud VPC.",
};

export default function TechnologyServicesPage() {
  return <ServiceDetailPageTemplate data={serviceDetailsData.technology} />;
}
