using System;
using System.Collections.Generic;
using Assig1.Models;
using Microsoft.EntityFrameworkCore;

namespace Assig1.Data;

public partial class ExpiationsContext : DbContext
{
    public ExpiationsContext()
    {
    }

    public ExpiationsContext(DbContextOptions<ExpiationsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CameraCode> CameraCodes { get; set; }

    public virtual DbSet<CameraType> CameraTypes { get; set; }

    public virtual DbSet<CountryState> CountryStates { get; set; }

    public virtual DbSet<Expiation> Expiations { get; set; }

    public virtual DbSet<ExpiationCategory> ExpiationCategories { get; set; }

    public virtual DbSet<LocalServiceArea> LocalServiceAreas { get; set; }

    public virtual DbSet<NoticeState> NoticeStates { get; set; }

    public virtual DbSet<NoticeType> NoticeTypes { get; set; }

    public virtual DbSet<Offence> Offences { get; set; }

    public virtual DbSet<OffenceState> OffenceStates { get; set; }

    public virtual DbSet<PhotoRejection> PhotoRejections { get; set; }

    public virtual DbSet<Section> Sections { get; set; }

    public virtual DbSet<SpeedingCategory> SpeedingCategories { get; set; }

    public virtual DbSet<WithdrawnReason> WithdrawnReasons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CameraCode>(entity =>
        {
            entity.HasKey(e => new { e.LocationId, e.CameraTypeCode }).HasName("CameraCodes_PK");

            entity.Property(e => e.LocationId).HasColumnName("locationID");
            entity.Property(e => e.CameraTypeCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("cameraTypeCode");
            entity.Property(e => e.RoadName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("roadName");
            entity.Property(e => e.RoadType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("roadType");
            entity.Property(e => e.Suburb)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("suburb");

            entity.HasOne(d => d.CameraTypeCodeNavigation).WithMany(p => p.CameraCodes)
                .HasForeignKey(d => d.CameraTypeCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("CameraCodes_Type");
        });

        modelBuilder.Entity<CameraType>(entity =>
        {
            entity.HasKey(e => e.CameraTypeCode).HasName("CameraTypes_PK");

            entity.HasIndex(e => e.CameraType1, "cameraType_UK").IsUnique();

            entity.Property(e => e.CameraTypeCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("cameraTypeCode");
            entity.Property(e => e.CameraType1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cameraType");
            entity.Property(e => e.ParentCameraTypeCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("parentCameraTypeCode");

            entity.HasOne(d => d.ParentCameraTypeCodeNavigation).WithMany(p => p.InverseParentCameraTypeCodeNavigation)
                .HasForeignKey(d => d.ParentCameraTypeCode)
                .HasConstraintName("parentCameraType_Parent");
        });

        modelBuilder.Entity<CountryState>(entity =>
        {
            entity.HasKey(e => e.CountryStateCode).HasName("CountryStates_PK");

            entity.HasIndex(e => e.CountryState1, "CountryStates_UK").IsUnique();

            entity.Property(e => e.CountryStateCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("countryStateCode");
            entity.Property(e => e.CountryState1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("countryState");
        });

        modelBuilder.Entity<Expiation>(entity =>
        {
            entity.HasKey(e => new { e.IncidentStartDate, e.IncidentStartTime, e.ExpId }).HasName("Expiations_PK");

            entity.Property(e => e.IncidentStartDate).HasColumnName("incidentStartDate");
            entity.Property(e => e.IncidentStartTime).HasColumnName("incidentStartTime");
            entity.Property(e => e.ExpId).HasColumnName("expID");
            entity.Property(e => e.BacContentExp)
                .HasColumnType("decimal(4, 3)")
                .HasColumnName("bacContentExp");
            entity.Property(e => e.CameraLocationId).HasColumnName("cameraLocationID");
            entity.Property(e => e.CameraTypeCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("cameraTypeCode");
            entity.Property(e => e.CorporateFeeAmt).HasColumnName("corporateFeeAmt");
            entity.Property(e => e.DriverState)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("driverState");
            entity.Property(e => e.EnforceWarningNoticeFeeAmt).HasColumnName("enforceWarningNoticeFeeAmt");
            entity.Property(e => e.IssueDate).HasColumnName("issueDate");
            entity.Property(e => e.LocationSpeedLimit).HasColumnName("locationSpeedLimit");
            entity.Property(e => e.LsaCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("lsaCode");
            entity.Property(e => e.OffenceCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("offenceCode");
            entity.Property(e => e.OffenceLevyAmt).HasColumnName("offenceLevyAmt");
            entity.Property(e => e.OffencePenaltyAmt).HasColumnName("offencePenaltyAmt");
            entity.Property(e => e.PhotoRejCode).HasColumnName("photoRejCode");
            entity.Property(e => e.RegState)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("regState");
            entity.Property(e => e.StatusCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("statusCode");
            entity.Property(e => e.TotalFeeAmt).HasColumnName("totalFeeAmt");
            entity.Property(e => e.TypeCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("typeCode");
            entity.Property(e => e.VehicleSpeed).HasColumnName("vehicleSpeed");
            entity.Property(e => e.WithdrawCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("withdrawCode");
        });

        modelBuilder.Entity<ExpiationCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("expiationCategories_PK");

            entity.HasIndex(e => new { e.CategoryName, e.ParentCategoryId }, "expiationCategories_UK").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("categoryID");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("categoryName");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.ParentCategoryId).HasColumnName("parentCategoryID");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("expiationCategories_ParentCategory");
        });

        modelBuilder.Entity<LocalServiceArea>(entity =>
        {
            entity.HasKey(e => e.LsaCode).HasName("LocalServiceAreas_PK");

            entity.Property(e => e.LsaCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("lsaCode");
            entity.Property(e => e.LsaDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lsaDescription");
        });

        modelBuilder.Entity<NoticeState>(entity =>
        {
            entity.HasKey(e => e.StatusCode).HasName("NoticeStatus_PK");

            entity.Property(e => e.StatusCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("statusCode");
            entity.Property(e => e.StatusDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("statusDescription");
        });

        modelBuilder.Entity<NoticeType>(entity =>
        {
            entity.HasKey(e => e.TypeCode).HasName("NoticeTypes_PK");

            entity.Property(e => e.TypeCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("typeCode");
            entity.Property(e => e.TypeDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("typeDescription");
        });

        modelBuilder.Entity<Offence>(entity =>
        {
            entity.HasKey(e => e.OffenceCode).HasName("Offences_PK");

            entity.Property(e => e.OffenceCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("offenceCode");
            entity.Property(e => e.AdultLevy).HasColumnName("adultLevy");
            entity.Property(e => e.CorporateFee).HasColumnName("corporateFee");
            entity.Property(e => e.DemeritPoints).HasColumnName("demeritPoints");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.ExpiationFee).HasColumnName("expiationFee");
            entity.Property(e => e.SectionCode)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("sectionCode");
            entity.Property(e => e.SectionId).HasColumnName("sectionID");
            entity.Property(e => e.TotalFee).HasColumnName("totalFee");

            entity.HasOne(d => d.Section).WithMany(p => p.Offences)
                .HasForeignKey(d => d.SectionId)
                .HasConstraintName("Offences_Section");
        });

        modelBuilder.Entity<OffenceState>(entity =>
        {
            entity.HasKey(e => e.StatusCode).HasName("OffenceStates_PK");

            entity.Property(e => e.StatusCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("statusCode");
            entity.Property(e => e.StatusDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("statusDescription");
        });

        modelBuilder.Entity<PhotoRejection>(entity =>
        {
            entity.HasKey(e => e.RejectionCode).HasName("PhotoRejections_PK");

            entity.Property(e => e.RejectionCode)
                .ValueGeneratedNever()
                .HasColumnName("rejectionCode");
            entity.Property(e => e.RejectionDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("rejectionDescription");
        });

        modelBuilder.Entity<Section>(entity =>
        {
            entity.HasKey(e => e.SectionId).HasName("Sections_PK");

            entity.HasIndex(e => new { e.SectionCode, e.SectionName, e.CategoryId }, "Sections_UK").IsUnique();

            entity.Property(e => e.SectionId).HasColumnName("sectionID");
            entity.Property(e => e.CategoryId).HasColumnName("categoryID");
            entity.Property(e => e.Expiable)
                .HasDefaultValue(true)
                .HasColumnName("expiable");
            entity.Property(e => e.SectionCode)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("sectionCode");
            entity.Property(e => e.SectionName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("sectionName");

            entity.HasOne(d => d.Category).WithMany(p => p.Sections)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Sections_Categories_FK");
        });

        modelBuilder.Entity<SpeedingCategory>(entity =>
        {
            entity.HasKey(e => new { e.SpeedCode, e.OffenceCode }).HasName("SpeedingCategories_PK");

            entity.Property(e => e.SpeedCode)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("speedCode");
            entity.Property(e => e.OffenceCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("offenceCode");
            entity.Property(e => e.SpeedDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("speedDescription");

            entity.HasOne(d => d.OffenceCodeNavigation).WithMany(p => p.SpeedingCategories)
                .HasForeignKey(d => d.OffenceCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("SpeedingCategories_OffenceCode_FK");
        });

        modelBuilder.Entity<WithdrawnReason>(entity =>
        {
            entity.HasKey(e => e.WithdrawCode).HasName("WithdrawnReasons_PK");

            entity.Property(e => e.WithdrawCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("withdrawCode");
            entity.Property(e => e.WithdrawReason)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("withdrawReason");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
