package com.enginemobi.bssuite.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import java.time.ZonedDateTime;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.enginemobi.bssuite.domain.enumeration.TxnType;

import com.enginemobi.bssuite.domain.enumeration.TxnEditType;

/**
 * A TxnActivityAudit.
 */
@Entity
@Table(name = "txn_activity_audit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "txnactivityaudit")
public class TxnActivityAudit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "edited_on")
    private ZonedDateTime editedOn;

    @Column(name = "txn_number")
    private String txnNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "txn_type")
    private TxnType txnType;

    @Column(name = "txn_amount", precision=10, scale=2)
    private BigDecimal txnAmount;

    @Column(name = "bank_acc")
    private String bankAcc;

    @Enumerated(EnumType.STRING)
    @Column(name = "edit_type")
    private TxnEditType editType;

    @ManyToOne
    @JoinColumn(name = "edited_by_id")
    private Staff editedBy;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getEditedOn() {
        return editedOn;
    }

    public void setEditedOn(ZonedDateTime editedOn) {
        this.editedOn = editedOn;
    }

    public String getTxnNumber() {
        return txnNumber;
    }

    public void setTxnNumber(String txnNumber) {
        this.txnNumber = txnNumber;
    }

    public TxnType getTxnType() {
        return txnType;
    }

    public void setTxnType(TxnType txnType) {
        this.txnType = txnType;
    }

    public BigDecimal getTxnAmount() {
        return txnAmount;
    }

    public void setTxnAmount(BigDecimal txnAmount) {
        this.txnAmount = txnAmount;
    }

    public String getBankAcc() {
        return bankAcc;
    }

    public void setBankAcc(String bankAcc) {
        this.bankAcc = bankAcc;
    }

    public TxnEditType getEditType() {
        return editType;
    }

    public void setEditType(TxnEditType editType) {
        this.editType = editType;
    }

    public Staff getEditedBy() {
        return editedBy;
    }

    public void setEditedBy(Staff staff) {
        this.editedBy = staff;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TxnActivityAudit txnActivityAudit = (TxnActivityAudit) o;
        return Objects.equals(id, txnActivityAudit.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "TxnActivityAudit{" +
            "id=" + id +
            ", editedOn='" + editedOn + "'" +
            ", txnNumber='" + txnNumber + "'" +
            ", txnType='" + txnType + "'" +
            ", txnAmount='" + txnAmount + "'" +
            ", bankAcc='" + bankAcc + "'" +
            ", editType='" + editType + "'" +
            '}';
    }
}
