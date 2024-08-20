using System;
using System.Collections.Generic;

namespace Assig1.Models;

public partial class Section
{
    public int SectionId { get; set; }

    public int CategoryId { get; set; }

    public string SectionCode { get; set; } = null!;

    public string SectionName { get; set; } = null!;

    public bool Expiable { get; set; }

    public virtual ExpiationCategory Category { get; set; } = null!;

    public virtual ICollection<Offence> Offences { get; set; } = new List<Offence>();
}
