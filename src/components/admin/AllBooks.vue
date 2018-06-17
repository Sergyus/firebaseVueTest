<template>
  <!--<div class="row">-->
  <!--<wysiwyg v-model="wsw"/>-->
  <!--</div>-->
  <div class="row u-mb-large">
    <div class="col-md-12">
      <div class="c-table-responsive@wide">
        <table class="c-table">
          <!-- <caption class="c-table__title">
              Invoices
          </caption> -->
          <thead class="c-table__head c-table__head--slim">
          <tr class="c-table__row">
            <th class="c-table__cell c-table__cell--head">No.</th>
            <th class="c-table__cell c-table__cell--head">Invoice Subject</th>
            <th class="c-table__cell c-table__cell--head">Client</th>
            <th class="c-table__cell c-table__cell--head">VAT No.</th>
            <th class="c-table__cell c-table__cell--head">Created</th>
            <th class="c-table__cell c-table__cell--head">Status</th>
            <th class="c-table__cell c-table__cell--head">Price</th>
            <th class="c-table__cell c-table__cell--head">
              <span class="u-hidden-visually">Actions</span>
            </th>
          </tr>
          </thead>

          <tbody>
          <tr class="c-table__row">
            <td class="c-table__cell"><span class="u-text-mute">00450</span></td>
            <td class="c-table__cell">Design Works</td>
            <td class="c-table__cell">
              <span class="u-text-mute">Carlson Limited</span>
            </td>
            <td class="c-table__cell">
              <span class="u-text-mute">87956621</span>
            </td>
            <td class="c-table__cell">
              <span class="u-text-mute">15 Dec 2017</span>
            </td>
            <td class="c-table__cell">
              <span class="c-badge c-badge--small c-badge--success">Paid</span>
            </td>
            <td class="c-table__cell">$887</td>
          </tr><!-- // .table__row -->

          <tr class="c-table__row">
            <td class="c-table__cell"><span class="u-text-mute">00450</span></td>
            <td class="c-table__cell">UX Wireframes</td>
            <td class="c-table__cell">
              <span class="u-text-mute">Adobe</span>
            </td>
            <td class="c-table__cell">
              <span class="u-text-mute">87956421</span>
            </td>
            <td class="c-table__cell">
              <span class="u-text-mute">12 Apr 2017</span>
            </td>
            <td class="c-table__cell">
              <span class="c-badge c-badge--small c-badge--warning">Pending</span>
            </td>
            <td class="c-table__cell">$1200</td>
          </tr><!-- // .table__row -->

          </tbody>
        </table>
      </div><!-- // .c-card -->
    </div>
  </div><!-- // .row -->
</template>

<script>
  export default {
    name: "AllBooks"
  }
</script>

<style scoped>

</style>
