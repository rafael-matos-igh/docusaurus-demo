---
sidebar_position: 2
---

# Quote journeys

A quote journey is the set of questions needed to price a product. Conduit returns it as data, so any application can render it however suits its channel, and a product change in Meridian Core needs no client release.

## Get the journey

```bash
curl "https://conduit.example.com/v1/quote-journeys/motor-comprehensive?locale=en-GB" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

```json
{
  "productCode": "motor-comprehensive",
  "version": "2026-02-14.3",
  "steps": [
    {
      "key": "vehicle",
      "title": "Your vehicle",
      "fields": [
        {
          "key": "vehicle.registration",
          "label": "Registration number",
          "type": "text",
          "required": true,
          "validation": { "pattern": "^[A-Z0-9 ]{2,8}$" }
        },
        {
          "key": "vehicle.value",
          "label": "Estimated value",
          "type": "money",
          "required": true,
          "validation": { "min": 500, "max": 150000 }
        }
      ]
    },
    {
      "key": "driver",
      "title": "Main driver",
      "fields": [
        { "key": "driver.dateOfBirth", "label": "Date of birth", "type": "date", "required": true },
        { "key": "driver.hasConvictions", "label": "Any motoring convictions?", "type": "boolean", "required": true },
        {
          "key": "driver.convictionDetails",
          "label": "Conviction details",
          "type": "text",
          "required": true,
          "showIf": { "field": "driver.hasConvictions", "operator": "equals", "value": true }
        }
      ]
    }
  ]
}
```

## Reading the definition

| Part | Meaning |
| --- | --- |
| `steps` | Ordered groups of fields. Present them in this order. |
| `fields[].key` | The key to use in `answers`. Keys are dotted paths such as `driver.dateOfBirth`. |
| `fields[].type` | One of `text`, `number`, `money`, `date`, `boolean`, `select`, `multiselect`, `address`. |
| `options` | Allowed values for `select` and `multiselect`. Send the `value`, show the `label`. |
| `validation` | Hints you can apply immediately: `min`, `max`, `pattern` and a `message`. |
| `showIf` | Show a step or field only when another answer matches. Hidden fields must not be sent. |
| `version` | Changes whenever the product configuration changes. |

:::tip
Cache the definition per `productCode` and `version`. Request it again when you start a new journey, and compare `version` with the quote you are resuming.
:::

## Validate as you go

Validate each step with `POST /quote-journeys/{productCode}/validate`. Nothing is stored.

```bash
curl -X POST https://conduit.example.com/v1/quote-journeys/motor-comprehensive/validate \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "step": "driver",
    "answers": {
      "driver.dateOfBirth": "2012-04-12",
      "driver.hasConvictions": false
    }
  }'
```

```json
{
  "valid": false,
  "errors": [
    {
      "field": "driver.dateOfBirth",
      "code": "too_young",
      "message": "Drivers must be at least 17."
    }
  ],
  "referrals": []
}
```

`referrals` lists answers that are allowed but will need underwriting review. Tell the customer that a decision may take longer.

Client-side rules from `validation` give instant feedback, but the server result is the authority. Always validate on the server before creating a quote.

## Related endpoints

- [`GET /quote-journeys/{productCode}`](../api/get-quote-journey)
- [`POST /quote-journeys/{productCode}/validate`](../api/validate-quote-answers)
