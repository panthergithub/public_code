// Chapter 3: Fraud Detection
// filename: ch3_frauddetection.js
// Mock policies database
const policiesDatabase = [
    { policyNumber: "POLICY001", holder: "John Doe", coverage: ["accident", "damage"] },
    { policyNumber: "POLICY002", holder: "Jane Smith", coverage: ["fire", "theft"] },
  ];
  
  // Mock claims database
  const claimsDatabase = [
    { claimId: "CLAIM-001", policyNumber: "POLICY001", amount: 5000, incidentType: "Accident", date: "2024-11-01", status: "Pending" },
    { claimId: "CLAIM-002", policyNumber: "POLICY001", amount: 25000, incidentType: "Accident", date: "2024-11-02", status: "Pending" },
    { claimId: "CLAIM-003", policyNumber: "POLICY002", amount: 200, incidentType: "Fire", date: "2024-11-01", status: "Pending" },
    { claimId: "CLAIM-004", policyNumber: "POLICY002", amount: 100000, incidentType: "Theft", date: "2024-11-02", status: "Pending" },
  ];
//2. Fraud Indicators
const fraudIndicators = [
    {
      name: "Excessive Claim Amount",
      rule: (claim) => claim.amount > 20000, // Flag claims exceeding $20,000
    },
    {
      name: "Repeated Claims",
      rule: (claim) => {
        const similarClaims = claimsDatabase.filter(
          (c) => c.policyNumber === claim.policyNumber && c.incidentType === claim.incidentType
        );
        return similarClaims.length > 1; // Flag repeated claims for the same incident type
      },
    },
    {
      name: "Suspicious Incident Type",
      rule: (claim) => ["Intentional Act", "Unknown"].includes(claim.incidentType),
    },
  ];
  //3. Fraud Detection Function
  const detectFraud = (claim) => {
    const flags = fraudIndicators
      .filter((indicator) => indicator.rule(claim))
      .map((indicator) => indicator.name);
  
    return {
      claimId: claim.claimId,
      policyNumber: claim.policyNumber,
      flags,
      isFraudulent: flags.length > 0,
    };
  };
  //4. Batch Fraud Detection for All Claims
  const detectFraudInAllClaims = () => {
    return claimsDatabase.map(detectFraud);
  };
//5. Generate Fraud Reports
const generateFraudReport = () => {
    const fraudResults = detectFraudInAllClaims(); // Run fraud detection for all claims.
  
    const flaggedClaims = fraudResults.filter((result) => result.isFraudulent); // Extract flagged claims.
    const cleanClaims = fraudResults.filter((result) => !result.isFraudulent); // Extract clean claims.
  
    const summary = fraudResults.reduce(
      (acc, result) => {
        if (result.isFraudulent) acc.flagged++;
        else acc.clean++;
        return acc;
      },
      { flagged: 0, clean: 0 }
    );
  
    return {
      flaggedClaims,
      cleanClaims,
      summary,
    };
  };
//--------------
console.log("=== Fraud Detection Results ===");
const fraudReport = generateFraudReport();

console.log("Flagged Claims:", fraudReport.flaggedClaims);
console.log("Clean Claims:", fraudReport.cleanClaims);
console.log("Summary:", fraudReport.summary);


