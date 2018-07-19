---
id: security
title: Security
url: /security/
---

## Security considerations

### Transport layer security

A register MUST only be available over HTTPS.  A register MUST NOT make
content available over insecure HTTP, though a register SHOULD offer a
redirect from HTTP to HTTPS.

A register contains authoritative data about a particular domain.  An attacker
in the middle should not be able to compromise the integrity of the data in
transit.  HTTPS is a basic control to prevent intermediaries from being able
to alter the data in transit.  For people viewing a register via a web
browser, HTTPS also prevents attackers from injecting malicious content such
as javascript.

#### HTTP Strict Transport Security

A register SHOULD enable HTTP Strict Transport Security <a
data-link-type="biblio" href="#biblio-rfc6797">[RFC6797]</a>.

The <code>register.gov.uk</code> domain sets a Strict-Transport-Security
policy for all subdomains. This means that browsers which are aware of this
policy will never attempt to use insecure HTTP to any
<code>*.register.gov.uk</code> domain.

#### Content-Security-Policy

A register SHOULD provide a Content-Security-Policy header <a
data-link-type="biblio" href="#biblio-csp2">[CSP2]</a>.  A basic
Content-Security-Policy suitable for a register is:

---
**Example**

```http
Content-Security-Policy: default-src 'self'
```

### Mint access control

### Compromised proof

### Stale record

### Denial of service

### DNS

### Protecting the private key

### Compromised private key

### Hash clash


