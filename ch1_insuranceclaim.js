// Chapter 1: Claim Reporting and Registration Process Module
// filename: ch1_insuranceclaim.js
// Claim Management System with Higher-Order Functions

// 1. Mock Database for Claims
const claimsDatabase = [];

// 2. Utility Function to Generate Claim ID
const generateClaimId = (() => {
  let counter = 1;
  return () => `CLAIM-${counter++}`;
})();

// 3. Claim Reporting and Registration Function
const reportClaim = (policyNumber, incidentDetails, contactInfo) => {
  const claim = {
    claimId: generateClaimId(),
    policyNumber,
    incidentDetails,
    contactInfo,
    status: 'Pending', // Initial status
    reportedDate: new Date(),
  };
  claimsDatabase.push(claim);
  console.log(`Claim registered: ${claim.claimId}`);
  return claim;
};

// 4. Filtering Utility Functions (Using Higher-Order Functions)

// Filter claims by status
const filterClaimsByStatus = (status) => claimsDatabase.filter(claim => claim.status === status);

// Filter claims by policy number
const filterClaimsByPolicy = (policyNumber) => claimsDatabase.filter(claim => claim.policyNumber === policyNumber);

// 5. Claim Updater Function (Advanced Higher-Order Function)
const updateClaim = (claimId, updateFn) => {
  const claimIndex = claimsDatabase.findIndex(claim => claim.claimId === claimId);
  if (claimIndex === -1) {
    console.error("Claim not found!");
    return null;
  }
  claimsDatabase[claimIndex] = updateFn(claimsDatabase[claimIndex]);
  console.log(`Claim updated: ${claimId}`);
  return claimsDatabase[claimIndex];
};

// 6. Example Claim Process Functions

// Register New Claim
const registerNewClaim = (policyNumber, incidentDetails, contactInfo) => {
  return reportClaim(policyNumber, incidentDetails, contactInfo);
};

// Review and Approve Claim (Higher-Order Functions in Action)
const approveClaim = (claimId) => {
  return updateClaim(claimId, claim => ({
    ...claim,
    status: 'Approved',
    approvedDate: new Date(),
  }));
};

// Deny Claim
const denyClaim = (claimId) => {
  return updateClaim(claimId, claim => ({
    ...claim,
    status: 'Denied',
    deniedDate: new Date(),
  }));
};

// 7. Claim Summary Report (Using map, filter, and reduce)

const getClaimSummary = () => {
  return claimsDatabase.map(claim => ({
    claimId: claim.claimId,
    policyNumber: claim.policyNumber,
    status: claim.status,
    reportedDate: claim.reportedDate,
  }));
};

// Function to get aggregate claim status counts
const getClaimStatusCounts = () => {
  return claimsDatabase.reduce((statusCounts, claim) => {
    statusCounts[claim.status] = (statusCounts[claim.status] || 0) + 1;
    return statusCounts;
  }, {});
};

// 8. Example Usage

// Register claims
registerNewClaim("POLICY123", "Car accident on highway", "John Doe - 555-1234");
registerNewClaim("POLICY124", "Water damage at home", "Jane Smith - 555-5678");

// Approve a claim
approveClaim("CLAIM-1");

// Deny a claim
denyClaim("CLAIM-2");

// Generate reports
console.log("Claim Summary Report:", getClaimSummary());
console.log("Claim Status Counts:", getClaimStatusCounts());
console.log("Pending Claims:", filterClaimsByStatus("Pending"));
console.log("Approved Claims:", filterClaimsByStatus("Approved"));

