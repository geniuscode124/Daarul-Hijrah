const url = "http://127.0.0.1:3000/api/auth";

async function testAuth() {
  console.log("Testing Signup with Better Auth...");
  const signupPayload = {
    email: `test${Date.now()}@example.com`,
    password: "Password123!",
    name: "Test User",
    firstName: "Test",
    lastName: "User",
    role: "STUDENT",
    status: "active",
    passwordHash: "tobereplaced", // Needed because of additionalFields config
  };

  const suRes = await fetch(`${url}/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "http://127.0.0.1:3000" },
    body: JSON.stringify(signupPayload),
  });

  if (!suRes.ok) {
    const text = await suRes.text();
    console.error("Signup failed", suRes.status, text);
    process.exit(1);
  }

  const signupData = await suRes.json();
  console.log("Signup success:", signupData.user?.email);

  // Extract cookies
  const cookies = suRes.headers.get("set-cookie") || "";
  console.log("Cookies received:", cookies ? "YES" : "NO");

  console.log("Testing Login with Better Auth...");
  const loginPayload = {
    email: signupPayload.email,
    password: "Password123!",
  };

  const loginRes = await fetch(`${url}/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "http://127.0.0.1:3000" },
    body: JSON.stringify(loginPayload),
  });

  if (!loginRes.ok) {
    const text = await loginRes.text();
    console.error("Login failed", loginRes.status, text);
    process.exit(1);
  }
  
  const loginCookies = loginRes.headers.get("set-cookie") || cookies;

  console.log("Testing Get Session...");
  const sessionRes = await fetch(`${url}/get-session`, {
    method: "GET",
    headers: {
      "Cookie": loginCookies,
      "Origin": "http://127.0.0.1:3000"
    },
  });

  if (!sessionRes.ok) {
    console.error("Get session failed", sessionRes.status);
    process.exit(1);
  }
  const sessionData = await sessionRes.json();
  console.log("Session User Role:", sessionData.user?.role);
  
  if (sessionData.user?.role) {
    console.log("Role exists in session!");
  } else {
    console.error("Role missing from session!");
    process.exit(1);
  }

  console.log("Testing Logout...");
  const logoutRes = await fetch(`${url}/sign-out`, {
    method: "POST",
    headers: {
      "Cookie": loginCookies,
      "Origin": "http://localhost:3000"
    },
  });

  if (!logoutRes.ok) {
    console.error("Logout failed");
    process.exit(1);
  }

  console.log("All tests passed successfully!");
}

testAuth();
