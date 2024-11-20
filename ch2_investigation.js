// Chapter 2: Insurance Claim Investigation, Validation and Coverage module
// filename: ch2_investigation.js
// Mock database for claims and policies
const claimsDatabase = [];
const policiesDatabase = [
  {
    policyNumber: "POLICY123",
    coverage: ["accident", "damage"],
    exclusions: ["intentional act", "wear and tear"]
  },
  {
    policyNumber: "POLICY124",
    coverage: ["water damage", "fire"],
    exclusions: ["earthquake", "flood"]
  }
];
//2. Utility Function to Generate Claim IDs
const generateClaimId = (() => {
    let counter = 1;
    return () => `CLAIM-${counter++}`;
  })();

  // 3. Claim Registration Function
  const registerClaim = (policyNumber, incidentType, contactInfo) => {
    const claim = {
      claimId: generateClaimId(),
      policyNumber,
      incidentType,
      contactInfo,
      status: "Pending",
      reportedDate: new Date(),
      validation: null // Will store validation details later
    };
    claimsDatabase.push(claim);
    console.log(`Claim registered: ${claim.claimId}`);
    return claim;
  };

  // 4. Validate Claim Scope
  const validateClaim = (claim) => {
    const policy = policiesDatabase.find(p => p.policyNumber === claim.policyNumber);
  
    if (!policy) {
      return {
        isValid: false,
        reason: "Policy not found"
      };
    }
  
    const isCovered = policy.coverage.includes(claim.incidentType.toLowerCase());
    const isExcluded = policy.exclusions.some(exc => 
      claim.incidentType.toLowerCase().includes(exc.toLowerCase())
    );
  
    if (!isCovered) {
      return {
        isValid: false,
        reason: "Incident not covered by policy"
      };
    }
  
    if (isExcluded) {
      return {
        isValid: false,
        reason: "Incident falls under policy exclusions"
      };
    }
  
    return {
      isValid: true,
      reason: "Claim is valid"
    };
  };
  //5. Process Validation Function (Higher-Order Function)
  const processValidation = (claimId, validationFn) => {
    const claim = claimsDatabase.find(c => c.claimId === claimId);
  
    if (!claim) {
      console.error("Claim not found!");
      return null;
    }
  
    const validationResult = validationFn(claim);
    claim.validation = validationResult;
    claim.status = validationResult.isValid ? "Valid" : "Invalid";
  
    console.log(`Claim validation completed: ${claim.claimId}`);
    return claim;
  };
  //6. Request Additional Information (Mock Implementation)

const requestAdditionalInfo = (claimId) => {
    const claim = claimsDatabase.find(c => c.claimId === claimId);

    if (!claim) {
        console.error("Claim not found!");
        return null;
    }

    const additionalInfo = {
        message: "Requested additional documentation",
        requestedDetails: ["police report", "repair estimate"]
    };

    console.log(`Requesting additional information for claim: ${claim.claimId}`);
    console.log("Details:", additionalInfo); // Log the additional information object
    return additionalInfo;
};

//-------------
  //7. Generate Reports
  // Generate a summary of all claims
const getClaimSummary = () => claimsDatabase.map(claim => ({
    claimId: claim.claimId,
    policyNumber: claim.policyNumber,
    incidentType: claim.incidentType,
    status: claim.status,
    validation: claim.validation?.reason || "Not yet validated",
    reportedDate: claim.reportedDate
  }));
  
  // Get aggregated claim statuses
  const getClaimStatusCounts = () => claimsDatabase.reduce((counts, claim) => {
    counts[claim.status] = (counts[claim.status] || 0) + 1;
    return counts;
  }, {});
//8. Example Usage
// Register Claims
registerClaim("POLICY123", "Car accident", "John Doe - 555-1234");
registerClaim("POLICY124", "Water damage", "Jane Smith - 555-5678");
registerClaim("POLICY123", "Intentional act", "Mark Spencer - 555-0000");

// Validate Claims
processValidation("CLAIM-1", validateClaim);
processValidation("CLAIM-2", validateClaim);
processValidation("CLAIM-3", validateClaim);

// Request Additional Info
requestAdditionalInfo("CLAIM-2");

// Generate Reports
console.log("Claim Summary Report:", getClaimSummary());
console.log("Claim Status Counts:", getClaimStatusCounts());
