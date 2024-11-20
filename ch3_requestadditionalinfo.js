// filename: ch3_requestadditionalinfo.js
// Mock Database for Claims
const claimsDatabase = [
    {
      claimId: "CLAIM-001",
      policyNumber: "POLICY001",
      incidentDetails: "Car accident on highway",
      contactInfo: "John Doe - 555-1234",
      status: "Pending",
      reportedDate: new Date("2024-11-10"),
      additionalInfo: [],
    },
    {
      claimId: "CLAIM-002",
      policyNumber: "POLICY002",
      incidentDetails: "Water damage at home",
      contactInfo: "Jane Smith - 555-5678",
      status: "Pending",
      reportedDate: new Date("2024-11-12"),
      additionalInfo: [],
    },
  ];
  
  // Request Additional Information Function
  const requestAdditionalInfo = (claimId, requiredInfo) => {
    const claim = claimsDatabase.find((claim) => claim.claimId === claimId);
  
    if (!claim) {
      console.error(`Claim ${claimId} not found.`);
      return null;
    }
  
    // Add the required info to the claim
    claim.additionalInfo.push({
      type: requiredInfo.type,
      description: requiredInfo.description,
      requestDate: new Date(),
    });
  
    console.log(
      `Additional information requested for Claim ${claimId}: ${requiredInfo.description}`
    );
    return claim;
  };
  
  // Submit Additional Information
  const submitAdditionalInfo = (claimId, infoType, submittedData) => {
    const claim = claimsDatabase.find((claim) => claim.claimId === claimId);
  
    if (!claim) {
      console.error(`Claim ${claimId} not found.`);
      return null;
    }
  
    const infoRequest = claim.additionalInfo.find(
      (info) => info.type === infoType && !info.resolved
    );
  
    if (!infoRequest) {
      console.error(
        `No unresolved request for ${infoType} found for Claim ${claimId}.`
      );
      return null;
    }
  
    // Mark the request as resolved and attach the submitted data
    infoRequest.resolved = true;
    infoRequest.submittedData = submittedData;
    infoRequest.resolvedDate = new Date();
  
    console.log(`Additional information submitted for Claim ${claimId}:`, submittedData);
    return claim;
  };
  

  //Generate Pending Requests Report
  const generatePendingRequestsReport = () => {
    return claimsDatabase.map((claim) => ({
      claimId: claim.claimId,
      pendingRequests: claim.additionalInfo
        .filter((info) => !info.resolved)
        .map((info) => ({
          type: info.type,
          description: info.description,
          requestDate: info.requestDate,
        })),
    }));
  };
  
  // Example Usage
  console.log("=== Requesting Additional Information ===");
  requestAdditionalInfo("CLAIM-001", {
    type: "Police Report",
    description: "Submit a police report for the accident.",
  });
  requestAdditionalInfo("CLAIM-002", {
    type: "Repair Estimate",
    description: "Provide a repair estimate for the damages.",
  });
  requestAdditionalInfo("CLAIM-001", {
    type: "Photographic Evidence",
    description: "Upload photos of the damaged vehicle.",
  });
  
  console.log("\n=== Submitting Additional Information ===");
  submitAdditionalInfo("CLAIM-001", "Police Report", {
    documentId: "PR123",
    fileLink: "http://example.com/police_report.pdf",
  });
  submitAdditionalInfo("CLAIM-002", "Repair Estimate", {
    estimateId: "RE456",
    fileLink: "http://example.com/repair_estimate.pdf",
  });
  
  console.log("\n=== Pending Requests Report ===");
  //console.log(generatePendingRequestsReport());
  // Example usage with readable JSON output
console.log(
    "\n=== Pending Requests Report ===\n",
    JSON.stringify(generatePendingRequestsReport(), null, 2)
  );
  