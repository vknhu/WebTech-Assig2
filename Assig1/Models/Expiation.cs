using System;
using System.Collections.Generic;

namespace Assig1.Models;

public partial class Expiation
{
    public int ExpId { get; set; }

    public DateOnly IncidentStartDate { get; set; }

    public TimeOnly IncidentStartTime { get; set; }

    public DateOnly? IssueDate { get; set; }

    public int? OffencePenaltyAmt { get; set; }

    public int? OffenceLevyAmt { get; set; }

    public int? CorporateFeeAmt { get; set; }

    public int? TotalFeeAmt { get; set; }

    public int? EnforceWarningNoticeFeeAmt { get; set; }

    public decimal? BacContentExp { get; set; }

    public int? VehicleSpeed { get; set; }

    public int? LocationSpeedLimit { get; set; }

    public string? OffenceCode { get; set; }

    public string? DriverState { get; set; }

    public string? RegState { get; set; }

    public string? LsaCode { get; set; }

    public int? CameraLocationId { get; set; }

    public string? CameraTypeCode { get; set; }

    public int? PhotoRejCode { get; set; }

    public string? StatusCode { get; set; }

    public string? WithdrawCode { get; set; }

    public string? TypeCode { get; set; }
}
