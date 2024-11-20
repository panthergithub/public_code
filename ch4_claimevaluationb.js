// Filename: ch4_claimevaluationb.js
// Mock Database for Claims
const claimsDatabase = [
    {
      claimId: "CLAIM-001", // Valid claim with all documents
      policyNumber: "POLICY123",
      incidentType: "Car Accident",
      reportedDate: new Date("2024-11-01"),
      documents: ["photos", "repairEstimate"],
      damagesReported: 15000,
      status: "Pending",
    },
    {
      claimId: "CLAIM-002", // Invalid: Documents Missing
      policyNumber: "POLICY124",
      incidentType: "Water Damage",
      reportedDate: new Date("2024-11-05"),
      documents: [],
      damagesReported: 25000,
      status: "Pending",
    },
    {
      claimId: "CLAIM-003", // Invalid: Policy Not Found
      policyNumber: "POLICY999",
      incidentType: "Fire Damage",
      reportedDate: new Date("2024-11-10"),
      documents: ["photos"],
      damagesReported: 50000,
      status: "Pending",
    },
    {
      claimId: "CLAIM-004", // Invalid: Incident Not Covered
      policyNumber: "POLICY125",
      incidentType: "Earthquake",
      reportedDate: new Date("2024-11-12"),
      documents: ["photos", "repairEstimate"],
      damagesReported: 30000,
      status: "Pending",
    },
    {
      claimId: "CLAIM-005", // Invalid: Incident Excluded
      policyNumber: "POLICY126",
      incidentType: "Intentional Act",
      reportedDate: new Date("2024-11-13"),
      documents: ["policeReport"],
      damagesReported: 10000,
      status: "Pending",
    },
  ];
  
  // Mock Database for Policies
  const policiesDatabase = [
    {
      policyNumber: "POLICY123",
      coverage: ["car accident", "fire damage"],
      exclusions: ["intentional act"],
      policyLimit: 20000,
    },
    {
      policyNumber: "POLICY124",
      coverage: ["water damage", "fire damage"],
      exclusions: ["earthquake"],
      policyLimit: 30000,
    },
    {
      policyNumber: "POLICY125",
      coverage: ["fire damage"],
      exclusions: ["earthquake"],
      policyLimit: 40000,
    },
    {
      policyNumber: "POLICY126",
      coverage: ["fire damage", "theft"],
      exclusions: ["intentional act"],
      policyLimit: 50000,
    },
  ];
  
  // Mock Data for Expert Evaluations
  const expertEvaluations = {
    "CLAIM-001": { evaluationAmount: 14000, remarks: "Verified damages." },
    "CLAIM-003": { evaluationAmount: 54000, remarks: "Verified damages although the amount is high." },
    "CLAIM-002": null, // No evaluation yet
  };
  
  // Evaluation Functions
  const documentCheck = (claim) => {
    if (!claim.documents || claim.documents.length === 0) {
      return {
        isValid: false,
        reason: "Documents Missing",
      };
    }
    return { isValid: true, reason: "Documents Submitted" };
  };
  
  const coverageCheck = (claim) => {
    const policy = policiesDatabase.find(
      (policy) => policy.policyNumber === claim.policyNumber
    );
  
    if (!policy) {
      return {
        isValid: false,
        reason: `Policy ${claim.policyNumber} not found.`,
      };
    }
  
    const isCovered = policy.coverage.includes(claim.incidentType.toLowerCase());
    const isExcluded = policy.exclusions.includes(
      claim.incidentType.toLowerCase()
    );
  
    if (!isCovered) {
      return {
        isValid: false,
        reason: "!isCovered",
      };
    }
  
    if (isExcluded) {
      return {
        isValid: false,
        reason: "isExcluded",
      };
    }
  
    return {
      isValid: true,
      reason: "Claim is within coverage scope.",
    };
  };
  // Expert Review
  const expertReview = (claim) => {
    const evaluation = expertEvaluations[claim.claimId];
    if (!evaluation) {
      return {
        expertStatus: "Not Evaluated",
      };
    }
    return {
      expertStatus: "Evaluated",
      evaluationDetails: evaluation,
    };
  };
  
  // Higher-Order Evaluation
  const evaluateClaim = (claimId, evaluationFns) => {
    const claim = claimsDatabase.find((claim) => claim.claimId === claimId);
    if (!claim) {
      console.error(`Claim ${claimId} not found.`);
      return;
    }
  
    const results = evaluationFns.map((fn) => fn(claim));
    const finalStatus = results.every((result) => result.isValid !== false);
  
    // Integrate expert evaluations into the claim
    const expertReviewResult = results.find(
      (result) => result.expertStatus
    );
  
    if (expertReviewResult && expertReviewResult.expertStatus === "Evaluated") {
      claim.expertEvaluation = expertReviewResult.evaluationDetails;
    }
  
    claim.status = finalStatus ? "Approved" : "Rejected";
  
    // Log detailed evaluation results
    console.log(`Claim Evaluation for ${claimId}:`, {
      ...results.reduce((acc, result) => ({ ...acc, ...result }), {}),
      isValid: finalStatus,
    });
  };
  
  // Evaluation Process
  console.log("\n=== Evaluating Claims ===");
  evaluateClaim("CLAIM-001", [documentCheck, coverageCheck, expertReview]); // Valid
  evaluateClaim("CLAIM-002", [documentCheck, coverageCheck, expertReview]); // Missing Documents
  evaluateClaim("CLAIM-003", [documentCheck, coverageCheck, expertReview]); // Policy Not Found
  evaluateClaim("CLAIM-004", [documentCheck, coverageCheck, expertReview]); // Not Covered
  evaluateClaim("CLAIM-005", [documentCheck, coverageCheck, expertReview]); // Excluded
  
  // Final Report: Ensures expert evaluations are displayed
  console.log("\n=== Updated Claims Database ===");
  console.log(JSON.stringify(claimsDatabase, null, 2));
  